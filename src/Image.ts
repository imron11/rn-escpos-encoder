import { PNG } from "pngjs";

export default class Image {

  private static async createStreamFromBase64(base64: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const url = `data:image/png;base64,${base64}`;
      try {
        const res = await fetch(url);
        const body = res.body;
        resolve(body);
      } catch (error) {
        reject(error)
      }
    });
  }

  public static async load(base64: string): Promise<Image> {
    const stream = await Image.createStreamFromBase64(base64);

    return new Promise<Image>(resolve => {
      stream.pipe(new PNG()).on("parsed", function (this: PNG) {
        const pixels = new Array<boolean>(this.width * this.height);
        for (let y = 0; y < this.height; y++) {
          for (let x = 0; x < this.width; x++) {
            // Get index 32bpp
            const idx = (this.width * y + x) * 4;
            let value = false;
            // Anything that is white-ish and has alpha > 128 is colored in, rest is blank.
            if (
              this.data[idx] < 0xe6 ||
              this.data[idx + 1] < 0xe6 ||
              this.data[idx + 2] < 0xe6
            ) {
              value = true;
            }
            if (value && this.data[idx + 3] <= 0x80) {
              value = false;
            }
            pixels[this.width * y + x] = value;
          }
        }
        resolve(new Image(pixels, this.width, this.height));
      });
    });
  }

  public width: number;
  public height: number;
  private data: boolean[];

  constructor(pixels: boolean[], width: number, height: number) {
    this.data = pixels;
    this.width = width;
    this.height = height;
  }

  public toRaster(): IRaster {
    const n = Math.ceil(this.width / 8);
    const result = new Uint8Array(this.height * n);

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.data[y * this.width + x]) {
          // tslint:disable-next-line no-bitwise
          result[y * n + (x >> 3)] += 0x80 >> (x % 8 & 0x7);
        }
      }
    }

    return {
      data: result,
      height: this.height,
      width: n
    };
  }

}

export interface IRaster {
  data: Uint8Array;
  height: number;
  width: number;
}
