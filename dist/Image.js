"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pngjs_1 = require("pngjs");
class Image {
    constructor(pixels, width, height) {
        this.data = pixels;
        this.width = width;
        this.height = height;
    }
    static createStreamFromBase64(base64) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const url = `data:image/png;base64,${base64}`;
                try {
                    const res = yield fetch(url);
                    const body = res.body;
                    resolve(body);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    static load(base64) {
        return __awaiter(this, void 0, void 0, function* () {
            const stream = yield Image.createStreamFromBase64(base64);
            return new Promise(resolve => {
                stream.pipe(new pngjs_1.PNG()).on("parsed", function () {
                    const pixels = new Array(this.width * this.height);
                    for (let y = 0; y < this.height; y++) {
                        for (let x = 0; x < this.width; x++) {
                            const idx = (this.width * y + x) * 4;
                            let value = false;
                            if (this.data[idx] < 0xe6 ||
                                this.data[idx + 1] < 0xe6 ||
                                this.data[idx + 2] < 0xe6) {
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
        });
    }
    toRaster() {
        const n = Math.ceil(this.width / 8);
        const result = new Uint8Array(this.height * n);
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.data[y * this.width + x]) {
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
exports.default = Image;
