"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requests_1 = require("../requests");
const utils_1 = require("../helpers/utils");
const tinycolor_1 = require("@ctrl/tinycolor");
const message_1 = require("../messages/message");
class DisplayText extends requests_1.TimeboxEvoRequest {
    constructor(opts) {
        super();
        this._animFrame = 0;
        this._opts = {
            text: "node-divoom-timebox-evo",
            paletteFn: this.PALETTE_TEXT_ON_BACKGROUND,
            animFn: this.ANIM_STATIC_BACKGROUND
        };
        this._opts = Object.assign(Object.assign({}, this._opts), opts);
        this._updateMessage();
    }
    PALETTE_TEXT_ON_BACKGROUND(text = "FFFFFF", background = "000000") {
        let back = (new tinycolor_1.TinyColor(background)).toHex();
        let front = (new tinycolor_1.TinyColor(text)).toHex();
        let palette = Array.from({ length: 256 }).fill(back, 0, 127);
        palette.fill(front, 127);
        return palette;
    }
    PALETTE_BLACK_ON_CMY_RAINBOW() {
        let palette = [];
        let r = 255, g = 0, b = 255;
        for (let i = 0; i < 254; i += 2) {
            palette.push(utils_1.number2HexString(r) + utils_1.number2HexString(g) + utils_1.number2HexString(b));
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
        for (let i = palette.length; i < 256; i++) {
            palette.push("000000");
        }
        return palette;
    }
    PALETTE_BLACK_ON_RAINBOW() {
        let palette = [];
        const size = 127;
        function sin_to_hex(i, phase) {
            let sin = Math.sin(Math.PI / size * 2 * i + phase);
            let int = Math.floor(sin * 127) + 128;
            return utils_1.number2HexString(int);
        }
        for (let i = 0; i < size; i++) {
            let red = sin_to_hex(i, 0 * Math.PI * 2 / 3); // 0   deg
            let blue = sin_to_hex(i, 1 * Math.PI * 2 / 3); // 120 deg
            let green = sin_to_hex(i, 2 * Math.PI * 2 / 3); // 240 deg
            palette.push(red + green + blue);
        }
        for (let i = palette.length; i < 256; i++) {
            palette.push("000000");
        }
        return palette;
    }
    ANIM_STATIC_BACKGROUND(i) {
        return Array.from({ length: 256 }).fill(0);
    }
    ANIM_UNI_GRADIANT_BACKGROUND(i) {
        return Array.from({ length: 256 }).fill(i % 127);
    }
    ANIM_HORIZONTAL_GRADIANT_BACKGROUND(frame) {
        let pixelArray = [];
        for (let y = 0; y < 16; y++) {
            for (let x = 0; x < 16; x++) {
                pixelArray.push((x + frame) % 127);
            }
        }
        return pixelArray;
    }
    ANIM_VERTICAL_GRADIANT_BACKGROUND(frame) {
        let pixelArray = [];
        for (let y = 0; y < 16; y++) {
            for (let x = 0; x < 16; x++) {
                pixelArray.push((y + frame) % 127);
            }
        }
        return pixelArray;
    }
    _encodeText(text) {
        let length = utils_1.number2HexString(text.length);
        let encodedText = "8601" + length;
        text.split("").forEach((char) => {
            encodedText += utils_1.int2hexlittle(char.charCodeAt(0));
        });
        return encodedText;
    }
    _updateMessage() {
        this.clear();
        const PACKAGE_INIT_MESSAGE = "6e01";
        if (typeof this._opts.animFn !== 'function' || typeof this._opts.paletteFn !== 'function') {
            throw new Error('paletteFn and animFn need to be functions');
        }
        this._animFrame = 0;
        this.push(PACKAGE_INIT_MESSAGE);
        this.push(this._encodeText(this._opts.text));
        const PALETTE_HEADER = "6c00000704aa070446000000";
        let pixels = '';
        const palette = this.colorPalette;
        this._opts.animFn(this._animFrame).forEach((pixel) => {
            pixels += utils_1.number2HexString(pixel);
        });
        this._animFrame++;
        this.push(PALETTE_HEADER
            + palette.join("")
            + pixels);
        this.push(this.getNextAnimationFrame().payload);
    }
    getNextAnimationFrame() {
        let pixelArray = this._opts.animFn(this._animFrame);
        if (pixelArray.length !== 256)
            throw new Error('The animFn should always generate a 256 pixel array');
        let pixelString = '';
        pixelArray.forEach(pixel => {
            pixelString += utils_1.number2HexString(pixel);
        });
        let animString = "6c"
            + utils_1.int2hexlittle(this._animFrame)
            + "0701aa070143000100"
            + pixelString;
        this._animFrame = ++this._animFrame % 65536;
        return new message_1.TimeboxEvoMessage(animString);
    }
    get paletteFn() {
        return this._opts.paletteFn;
    }
    set paletteFn(paletteFn) {
        if (typeof paletteFn !== 'function') {
            throw new Error('paletteFn is not a function');
        }
        this._opts.paletteFn = paletteFn;
        this._updateMessage();
    }
    get colorPalette() {
        let palette = this.paletteFn();
        if (palette.length !== 256) {
            throw new Error('The paletteFn should always generate 256 colors');
        }
        let result = [];
        palette.forEach((color) => {
            const lColor = new tinycolor_1.TinyColor(color);
            if (!lColor.isValid) {
                throw new Error('One of your color is not valid');
            }
            result.push(lColor.toHex());
        });
        return result;
    }
    get animFn() {
        return this._opts.animFn;
    }
    set animFn(animFn) {
        if (typeof animFn !== 'function') {
            throw new Error('paletteFn is not a function');
        }
        this._opts.animFn = animFn;
        this._updateMessage();
    }
    get pixels() {
        return this.animFn(this._animFrame);
    }
    get frame() {
        return this._animFrame;
    }
    set text(text) {
        this._opts.text = text;
        this._updateMessage();
    }
    get text() {
        return this._opts.text;
    }
}
exports.DisplayText = DisplayText;
