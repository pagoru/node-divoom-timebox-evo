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
const requests_1 = require("../requests");
const fs = require("fs");
const fileType = require("file-type");
const Jimp = require("jimp");
const gifWrap = require("gifwrap");
const jimp_overloads_1 = require("./jimp_overloads");
class DisplayAnimation extends requests_1.TimeboxEvoRequest {
    constructor(opts) {
        super();
        this._opts = {
            size: 32
        };
        this._opts = Object.assign(Object.assign({}, this._opts), opts);
    }
    /**
     * Reads an image and returns a promise of [[JimpArray]]. It works with gif, jpeg, png and bmp
     * @param input a filepath to an image or a buffer reprensenting an image
     * @returns a promse of [[JimpArray]]
     *
     * ```typescript
     * d.read(msg.buffer).then(result => {
     *   node.send({ payload: result.asBinaryBuffer() });
     * }).catch(err => {
     *   throw err
     * })
     * ```
     */
    read(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let buffer;
            if (Buffer.isBuffer(input)) {
                buffer = input;
            }
            else {
                buffer = fs.readFileSync(input);
            }
            let ft = fileType(buffer);
            ft = fileType(buffer);
            if (ft) {
                switch (ft.mime) {
                    case "image/gif":
                        return yield this._displayAnimationFromGIF(buffer);
                    case "image/jpeg":
                    case "image/png":
                    case "image/bmp":
                        return yield this._displayImage(buffer);
                    default:
                        throw new Error("file type not supported");
                }
            }
            else {
                throw new Error("file type unkown");
            }
        });
    }
    /**
     * This function generates the message when the a static image is used
     * @param input a Buffer representing an image file
     * @returns A promise which resolves when the processing is done
     */
    _displayImage(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let ja = jimp_overloads_1.JimpArray.create();
            const image = yield Jimp.read(input);
            let resized = new jimp_overloads_1.DivoomJimpStatic(image.resize(this._opts.size, this._opts.size, Jimp.RESIZE_NEAREST_NEIGHBOR));
            ja.push(resized);
            return ja;
        });
    }
    /**
     * This function generates the message when the a static image is used
     * @param input Buffer representing an image file
     * @returns A promise which resolves when the processing is done
     */
    _displayAnimationFromGIF(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let gifCodec = new gifWrap.GifCodec();
            const inputGif = yield gifCodec.decodeGif(input);
            let ja = jimp_overloads_1.JimpArray.create();
            inputGif.frames.forEach((frame, index) => {
                let image = gifWrap.GifUtil.copyAsJimp(jimp_overloads_1.DivoomJimpAnim, frame).resize(this._opts.size, this._opts.size);
                image.delay = frame.delayCentisecs * 10;
                image.frame = index;
                ja.push(image);
            });
            return ja;
        });
    }
}
exports.DisplayAnimation = DisplayAnimation;
