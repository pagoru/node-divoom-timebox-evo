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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { TimeboxEvoRequest } from "../requests";
import { number2HexString, int2hexlittle } from "../helpers/utils";
import { TinyColor } from "@ctrl/tinycolor";
import { TimeboxEvoMessage } from "../messages/message";
var DisplayText = (function (_super) {
    __extends(DisplayText, _super);
    function DisplayText(opts) {
        var _this = _super.call(this) || this;
        _this._animFrame = 0;
        _this._opts = {
            text: "node-divoom-timebox-evo",
            paletteFn: _this.PALETTE_TEXT_ON_BACKGROUND,
            animFn: _this.ANIM_STATIC_BACKGROUND
        };
        _this._opts = __assign(__assign({}, _this._opts), opts);
        _this._updateMessage();
        return _this;
    }
    DisplayText.prototype.PALETTE_TEXT_ON_BACKGROUND = function (text, background) {
        if (text === void 0) { text = "FFFFFF"; }
        if (background === void 0) { background = "000000"; }
        var back = (new TinyColor(background)).toHex();
        var front = (new TinyColor(text)).toHex();
        var palette = Array.from({ length: 256 }).fill(back, 0, 127);
        palette.fill(front, 127);
        return palette;
    };
    DisplayText.prototype.PALETTE_BLACK_ON_CMY_RAINBOW = function () {
        var palette = [];
        var r = 255, g = 0, b = 255;
        for (var i = 0; i < 254; i += 2) {
            palette.push(number2HexString(r) + number2HexString(g) + number2HexString(b));
            if (i < 85) {
                b = Math.max(0, b - 6);
                g = Math.min(255, g + 6);
            }
            else if (i < 170) {
                b = Math.min(255, b + 6);
                r = Math.max(0, r - 6);
            }
            else {
                r = Math.min(255, r + 6);
                g = Math.max(0, g - 6);
            }
        }
        for (var i = palette.length; i < 256; i++) {
            palette.push("000000");
        }
        return palette;
    };
    DisplayText.prototype.PALETTE_BLACK_ON_RAINBOW = function () {
        var palette = [];
        var size = 127;
        function sin_to_hex(i, phase) {
            var sin = Math.sin(Math.PI / size * 2 * i + phase);
            var int = Math.floor(sin * 127) + 128;
            return number2HexString(int);
        }
        for (var i = 0; i < size; i++) {
            var red = sin_to_hex(i, 0 * Math.PI * 2 / 3);
            var blue = sin_to_hex(i, 1 * Math.PI * 2 / 3);
            var green = sin_to_hex(i, 2 * Math.PI * 2 / 3);
            palette.push(red + green + blue);
        }
        for (var i = palette.length; i < 256; i++) {
            palette.push("000000");
        }
        return palette;
    };
    DisplayText.prototype.ANIM_STATIC_BACKGROUND = function (i) {
        return Array.from({ length: 256 }).fill(0);
    };
    DisplayText.prototype.ANIM_UNI_GRADIANT_BACKGROUND = function (i) {
        return Array.from({ length: 256 }).fill(i % 127);
    };
    DisplayText.prototype.ANIM_HORIZONTAL_GRADIANT_BACKGROUND = function (frame) {
        var pixelArray = [];
        for (var y = 0; y < 16; y++) {
            for (var x = 0; x < 16; x++) {
                pixelArray.push((x + frame) % 127);
            }
        }
        return pixelArray;
    };
    DisplayText.prototype.ANIM_VERTICAL_GRADIANT_BACKGROUND = function (frame) {
        var pixelArray = [];
        for (var y = 0; y < 16; y++) {
            for (var x = 0; x < 16; x++) {
                pixelArray.push((y + frame) % 127);
            }
        }
        return pixelArray;
    };
    DisplayText.prototype._encodeText = function (text) {
        var length = number2HexString(text.length);
        var encodedText = "8601" + length;
        text.split("").forEach(function (char) {
            encodedText += int2hexlittle(char.charCodeAt(0));
        });
        return encodedText;
    };
    DisplayText.prototype._updateMessage = function () {
        this.clear();
        var PACKAGE_INIT_MESSAGE = "6e01";
        if (typeof this._opts.animFn !== 'function' || typeof this._opts.paletteFn !== 'function') {
            throw new Error('paletteFn and animFn need to be functions');
        }
        this._animFrame = 0;
        this.push(PACKAGE_INIT_MESSAGE);
        this.push(this._encodeText(this._opts.text));
        var PALETTE_HEADER = "6c00000704aa070446000000";
        var pixels = '';
        var palette = this.colorPalette;
        this._opts.animFn(this._animFrame).forEach(function (pixel) {
            pixels += number2HexString(pixel);
        });
        this._animFrame++;
        this.push(PALETTE_HEADER
            + palette.join("")
            + pixels);
        this.push(this.getNextAnimationFrame().payload);
    };
    DisplayText.prototype.getNextAnimationFrame = function () {
        var pixelArray = this._opts.animFn(this._animFrame);
        if (pixelArray.length !== 256)
            throw new Error('The animFn should always generate a 256 pixel array');
        var pixelString = '';
        pixelArray.forEach(function (pixel) {
            pixelString += number2HexString(pixel);
        });
        var animString = "6c"
            + int2hexlittle(this._animFrame)
            + "0701aa070143000100"
            + pixelString;
        this._animFrame = ++this._animFrame % 65536;
        return new TimeboxEvoMessage(animString);
    };
    Object.defineProperty(DisplayText.prototype, "paletteFn", {
        get: function () {
            return this._opts.paletteFn;
        },
        set: function (paletteFn) {
            if (typeof paletteFn !== 'function') {
                throw new Error('paletteFn is not a function');
            }
            this._opts.paletteFn = paletteFn;
            this._updateMessage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayText.prototype, "colorPalette", {
        get: function () {
            var palette = this.paletteFn();
            if (palette.length !== 256) {
                throw new Error('The paletteFn should always generate 256 colors');
            }
            var result = [];
            palette.forEach(function (color) {
                var lColor = new TinyColor(color);
                if (!lColor.isValid) {
                    throw new Error('One of your color is not valid');
                }
                result.push(lColor.toHex());
            });
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayText.prototype, "animFn", {
        get: function () {
            return this._opts.animFn;
        },
        set: function (animFn) {
            if (typeof animFn !== 'function') {
                throw new Error('paletteFn is not a function');
            }
            this._opts.animFn = animFn;
            this._updateMessage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayText.prototype, "pixels", {
        get: function () {
            return this.animFn(this._animFrame);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayText.prototype, "frame", {
        get: function () {
            return this._animFrame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayText.prototype, "text", {
        get: function () {
            return this._opts.text;
        },
        set: function (text) {
            this._opts.text = text;
            this._updateMessage();
        },
        enumerable: true,
        configurable: true
    });
    return DisplayText;
}(TimeboxEvoRequest));
export { DisplayText };
//# sourceMappingURL=text.js.map