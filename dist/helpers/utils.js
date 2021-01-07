"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tinycolor_1 = require("@ctrl/tinycolor");
/**
 * Converts a hexadecimal string to a char-code composed string
 * @param str the string to convert from a hex string representation to a charcode representation
 * @returns the char-code string
 */
function unhexlify(str) {
    var result = '';
    if (str.length % 2 !== 0) {
        throw new Error('The string length is not a multiple of 2');
    }
    for (var i = 0, l = str.length; i < l; i += 2) {
        const toHex = parseInt(str.substr(i, 2), 16);
        if (isNaN(toHex)) {
            throw new Error('str contains non hex character');
        }
        result += String.fromCharCode(toHex);
    }
    return result;
}
exports.unhexlify = unhexlify;
;
/**
 * Converts a number to it's hexadecimal string representation in least significant byte first
 * @param value the value to convert between 0 and 65535
 * @returns the LSB First string reprensenting `value`
 */
function int2hexlittle(value) {
    if (value > 65535 || value < 0) {
        throw new TypeError('int2hexlittle only supports value between 0 and 65535');
    }
    ;
    const byte1 = (value & 0xFF).toString(16).padStart(2, "0");
    const byte2 = ((value >> 8) & 0xFF).toString(16).padStart(2, "0");
    return `${byte1}${byte2}`;
}
exports.int2hexlittle = int2hexlittle;
/**
 * Converts an 8bit number to it's hexadecimal string representation
 * @param int the number to convert
 * @returns the hexadecimal string reprensetation
 */
function number2HexString(int) {
    if (int > 255 || int < 0) {
        throw new Error('number2HexString works only with number between 0 and 255');
    }
    return Math.round(int).toString(16).padStart(2, "0");
}
exports.number2HexString = number2HexString;
/**
 * Convert a boolean to `00` or `01`
 * @param bool a boolean
 * @returns a string representing the boolean
 */
function boolean2HexString(bool) {
    return bool ? "01" : "00";
}
exports.boolean2HexString = boolean2HexString;
/**
 * Converts a color to an hexadecimal string representation
 * @param color the color to convert
 */
function color2HexString(color) {
    return new tinycolor_1.TinyColor(color).toHex();
}
exports.color2HexString = color2HexString;
/**
 * Converts the brightness to a hex string
 * @param brightness the brightness
 * @returns the hex string
 */
function brightness2HexString(brightness) {
    if (brightness > 100) {
        brightness = 100;
    }
    else if (brightness < 0) {
        brightness = 0;
    }
    return number2HexString(Math.trunc(brightness));
}
exports.brightness2HexString = brightness2HexString;
