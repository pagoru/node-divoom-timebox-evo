"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_array_1 = require("../messages/message_array");
const utils_1 = require("../helpers/utils");
const message_1 = require("../messages/message");
const Jimp = require("jimp");
class JimpArray extends Array {
    constructor(items) {
        super(...items);
    }
    static create() {
        return Object.create(JimpArray.prototype);
    }
    _animAsDivoomMessages() {
        const _PACKAGE_PREFIX = '49';
        let dms = message_array_1.TimeboxEvoMessageArray.create();
        let fullString = '';
        let totalSize = 0;
        this.forEach(image => {
            const dm = image.asDivoomMessage();
            fullString += dm.payload;
            totalSize += dm.payload.length / 2;
        });
        let messageCounter = 0;
        const totalSizeHex = utils_1.int2hexlittle(totalSize);
        fullString.match(/.{1,400}/g).forEach((message) => {
            dms.push(new message_1.TimeboxEvoMessage(_PACKAGE_PREFIX
                + totalSizeHex
                + utils_1.number2HexString(messageCounter)
                + message));
            messageCounter++;
        });
        return dms;
    }
    _staticAsDivoomMessages() {
        const PACKAGE_PREFIX = '44000A0A04';
        let dms = message_array_1.TimeboxEvoMessageArray.create();
        dms.push(this[0].asDivoomMessage().prepend(PACKAGE_PREFIX));
        return dms;
    }
    asDivoomMessages() {
        if (this[0]) {
            if (this[0] instanceof DivoomJimpAnim) {
                return this._animAsDivoomMessages();
            }
            else if (this[0] instanceof DivoomJimpStatic) {
                return this._staticAsDivoomMessages();
            }
        }
        else {
            return message_array_1.TimeboxEvoMessageArray.create();
        }
    }
    asBinaryBuffer() {
        let bufferArray = [];
        this.asDivoomMessages().forEach((message) => {
            bufferArray = bufferArray.concat(message.asBinaryBuffer());
        });
        return bufferArray;
    }
}
exports.JimpArray = JimpArray;
class DivoomJimp extends Jimp {
    getColorsAndPixels() {
        let colorsArray = [];
        let pixelArray = [];
        let colorCounter = 0;
        this.scan(0, 0, this.bitmap.width, this.bitmap.height, function (x, y, idx) {
            const red = this.bitmap.data[idx + 0];
            const green = this.bitmap.data[idx + 1];
            const blue = this.bitmap.data[idx + 2];
            const color = red.toString(16).padStart(2, "0")
                + green.toString(16).padStart(2, "0")
                + blue.toString(16).padStart(2, "0");
            if (!colorsArray.includes(color)) {
                colorsArray.push(color);
                pixelArray[x + this.bitmap.width * y] = colorCounter;
                colorCounter++;
            }
            else {
                pixelArray[x + this.bitmap.width * y] = colorsArray.indexOf(color);
            }
        });
        return { colors: colorsArray, pixels: pixelArray };
    }
    /**
   * This builds the pixel string to use in a message
   * @param pixelArray the pixel array, each item being a reference to the color in the color array
   * @param nbColors the number of colors in the colors array
   * @returns the pixel sting to use in a message
   */
    getPixelString(pixelArray, nbColors) {
        let nbBitsForAPixel = Math.log(nbColors) / Math.log(2) / 2;
        let bits = Number.isInteger(nbBitsForAPixel)
            ? nbBitsForAPixel
            : (Math.trunc(nbBitsForAPixel) + 1);
        if (bits === 0)
            bits = 1;
        let pixelString = '';
        pixelArray.forEach((pixel) => {
            pixelString += pixel.toString(2).padStart(8, '0').split("").reverse().join("").substring(0, bits);
        });
        let pixBinArray = pixelString.match(/.{1,8}/g);
        let pixelStringFinal = '';
        pixBinArray.forEach((pixel) => {
            pixelStringFinal += parseInt(pixel.split("").reverse().join(""), 2).toString(16).padStart(2, '0');
        });
        return pixelStringFinal;
    }
    asBinaryBuffer() {
        return [];
    }
}
exports.DivoomJimp = DivoomJimp;
class DivoomJimpAnim extends DivoomJimp {
    constructor() {
        super(...arguments);
        this._frame = 0;
        this._delay = 0;
    }
    set frame(frame) {
        this._frame = frame;
    }
    get frame() {
        return this._frame;
    }
    set delay(delay) {
        this._delay = delay;
    }
    get delay() {
        return this._delay;
    }
    asDivoomMessage() {
        let resetPalette = true;
        let colorsAndPixels = this.getColorsAndPixels();
        const nbColorsHex = utils_1.number2HexString(colorsAndPixels.colors.length % 256);
        const colorString = colorsAndPixels.colors.join("");
        const pixelString = this.getPixelString(colorsAndPixels.pixels, colorsAndPixels.colors.length);
        const delayHex = utils_1.int2hexlittle(this.delay);
        const stringWithoutHeader = delayHex
            + (resetPalette ? "00" : "01")
            + nbColorsHex
            + colorString
            + pixelString;
        const sizeHex = utils_1.int2hexlittle((stringWithoutHeader.length + 6) / 2);
        const fullString = 'aa' +
            sizeHex +
            stringWithoutHeader;
        return new message_1.TimeboxEvoMessage(fullString);
    }
}
exports.DivoomJimpAnim = DivoomJimpAnim;
class DivoomJimpStatic extends DivoomJimp {
    asDivoomMessage() {
        let colorsAndPixels = this.getColorsAndPixels();
        const nbColorsHex = utils_1.number2HexString(colorsAndPixels.colors.length % 256);
        const colorString = colorsAndPixels.colors.join("");
        const pixelString = this.getPixelString(colorsAndPixels.pixels, colorsAndPixels.colors.length);
        const stringWithoutHeader = nbColorsHex
            + colorString
            + pixelString;
        const sizeHex = utils_1.int2hexlittle((('AA0000000000' + stringWithoutHeader).length) / 2);
        const fullString = 'aa'
            + sizeHex
            + '000000'
            + stringWithoutHeader;
        return new message_1.TimeboxEvoMessage(fullString);
    }
}
exports.DivoomJimpStatic = DivoomJimpStatic;
