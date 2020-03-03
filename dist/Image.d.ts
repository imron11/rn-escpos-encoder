export default class Image {
    private static createStreamFromBase64;
    static load(base64: string): Promise<Image>;
    width: number;
    height: number;
    private data;
    constructor(pixels: boolean[], width: number, height: number);
    toRaster(): IRaster;
}
export interface IRaster {
    data: Uint8Array;
    height: number;
    width: number;
}
