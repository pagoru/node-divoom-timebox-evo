var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { TimeboxEvoMessageArray } from "../messages/message_array";
import { int2hexlittle, number2HexString } from "../helpers/utils";
import { TimeboxEvoMessage } from "../messages/message";
import Jimp from 'jimp';
var JimpArray = (function (_super) {
    __extends(JimpArray, _super);
    function JimpArray(items) {
        return _super.apply(this, items) || this;
    }
    JimpArray.create = function () {
        return Object.create(JimpArray.prototype);
    };
    JimpArray.prototype._animAsDivoomMessages = function () {
        var _PACKAGE_PREFIX = '49';
        var dms = TimeboxEvoMessageArray.create();
        var fullString = '';
        var totalSize = 0;
        this.forEach(function (image) {
            var dm = image.asDivoomMessage();
            fullString += dm.payload;
            totalSize += dm.payload.length / 2;
        });
        var messageCounter = 0;
        var totalSizeHex = int2hexlittle(totalSize);
        fullString.match(/.{1,400}/g).forEach(function (message) {
            dms.push(new TimeboxEvoMessage(_PACKAGE_PREFIX
                + totalSizeHex
                + number2HexString(messageCounter)
                + message));
            messageCounter++;
        });
        return dms;
    };
    JimpArray.prototype._staticAsDivoomMessages = function () {
        var PACKAGE_PREFIX = '44000A0A04';
        var dms = TimeboxEvoMessageArray.create();
        dms.push(this[0].asDivoomMessage().prepend(PACKAGE_PREFIX));
        return dms;
    };
    JimpArray.prototype.asDivoomMessages = function () {
        if (this[0]) {
            if (this[0] instanceof DivoomJimpAnim) {
                return this._animAsDivoomMessages();
            }
            else if (this[0] instanceof DivoomJimpStatic) {
                return this._staticAsDivoomMessages();
            }
        }
        else {
            return TimeboxEvoMessageArray.create();
        }
    };
    JimpArray.prototype.asBinaryBuffer = function () {
        var bufferArray = [];
        this.asDivoomMessages().forEach(function (message) {
            bufferArray = bufferArray.concat(message.asBinaryBuffer());
        });
        return bufferArray;
    };
    return JimpArray;
}(Array));
export { JimpArray };
var DivoomJimp = (function (_super) {
    __extends(DivoomJimp, _super);
    function DivoomJimp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DivoomJimp.prototype.getColorsAndPixels = function () {
        var colorsArray = [];
        var pixelArray = [];
        var colorCounter = 0;
        this.scan(0, 0, this.bitmap.width, this.bitmap.height, function (x, y, idx) {
            var red = this.bitmap.data[idx + 0];
            var green = this.bitmap.data[idx + 1];
            var blue = this.bitmap.data[idx + 2];
            var color = red.toString(16).padStart(2, "0")
                + green.toString(16).padStart(2, "0")
                + blue.toString(16).padStart(2, "0");
            if (!colorsArray.includes(color)) {
                colorsArray.push(color);
                pixelArray[x + 16 * y] = colorCounter;
                colorCounter++;
            }
            else {
                pixelArray[x + 16 * y] = colorsArray.indexOf(color);
            }
        });
        return { colors: colorsArray, pixels: pixelArray };
    };
    DivoomJimp.prototype.getPixelString = function (pixelArray, nbColors) {
        var nbBitsForAPixel = Math.log(nbColors) / Math.log(2);
        var bits = Number.isInteger(nbBitsForAPixel)
            ? nbBitsForAPixel
            : (Math.trunc(nbBitsForAPixel) + 1);
        if (bits === 0)
            bits = 1;
        var pixelString = '';
        pixelArray.forEach(function (pixel) {
            pixelString += pixel.toString(2).padStart(8, '0').split("").reverse().join("").substring(0, bits);
        });
        var pixBinArray = pixelString.match(/.{1,8}/g);
        var pixelStringFinal = '';
        pixBinArray.forEach(function (pixel) {
            pixelStringFinal += parseInt(pixel.split("").reverse().join(""), 2).toString(16).padStart(2, '0');
        });
        return pixelStringFinal;
    };
    DivoomJimp.prototype.asBinaryBuffer = function () {
        return [];
    };
    return DivoomJimp;
}(Jimp));
export { DivoomJimp };
var DivoomJimpAnim = (function (_super) {
    __extends(DivoomJimpAnim, _super);
    function DivoomJimpAnim() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._frame = 0;
        _this._delay = 0;
        return _this;
    }
    Object.defineProperty(DivoomJimpAnim.prototype, "frame", {
        get: function () {
            return this._frame;
        },
        set: function (frame) {
            this._frame = frame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DivoomJimpAnim.prototype, "delay", {
        get: function () {
            return this._delay;
        },
        set: function (delay) {
            this._delay = delay;
        },
        enumerable: true,
        configurable: true
    });
    DivoomJimpAnim.prototype.asDivoomMessage = function () {
        var resetPalette = true;
        var colorsAndPixels = this.getColorsAndPixels();
        var nbColorsHex = number2HexString(colorsAndPixels.colors.length % 256);
        var colorString = colorsAndPixels.colors.join("");
        var pixelString = this.getPixelString(colorsAndPixels.pixels, colorsAndPixels.colors.length);
        var delayHex = int2hexlittle(this.delay);
        var stringWithoutHeader = delayHex
            + (resetPalette ? "00" : "01")
            + nbColorsHex
            + colorString
            + pixelString;
        var sizeHex = int2hexlittle((stringWithoutHeader.length + 6) / 2);
        var fullString = 'aa' +
            sizeHex +
            stringWithoutHeader;
        return new TimeboxEvoMessage(fullString);
    };
    return DivoomJimpAnim;
}(DivoomJimp));
export { DivoomJimpAnim };
var DivoomJimpStatic = (function (_super) {
    __extends(DivoomJimpStatic, _super);
    function DivoomJimpStatic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DivoomJimpStatic.prototype.asDivoomMessage = function () {
        var colorsAndPixels = this.getColorsAndPixels();
        var nbColorsHex = number2HexString(colorsAndPixels.colors.length % 256);
        var colorString = colorsAndPixels.colors.join("");
        var pixelString = this.getPixelString(colorsAndPixels.pixels, colorsAndPixels.colors.length);
        var stringWithoutHeader = nbColorsHex
            + colorString
            + pixelString;
        var sizeHex = int2hexlittle((('AA0000000000' + stringWithoutHeader).length) / 2);
        var fullString = 'aa'
            + sizeHex
            + '000000'
            + stringWithoutHeader;
        return new TimeboxEvoMessage(fullString);
    };
    return DivoomJimpStatic;
}(DivoomJimp));
export { DivoomJimpStatic };
//# sourceMappingURL=jimp_overloads.js.map