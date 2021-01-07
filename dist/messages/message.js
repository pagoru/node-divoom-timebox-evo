"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../helpers/utils");
class TimeboxEvoMessage {
    constructor(msg = '') {
        this._START = "01";
        this._END = "02";
        this.append(msg);
    }
    _calcCRC() {
        if (!this._message)
            return undefined;
        let msg = this.lengthHS + this._message;
        let sum = 0;
        for (let i = 0, l = msg.length; i < l; i += 2) {
            sum += parseInt(msg.substr(i, 2), 16);
        }
        return sum % 65536;
    }
    get crc() {
        if (!this._message)
            return undefined;
        return this._calcCRC();
    }
    get crcHS() {
        if (!this._message)
            return undefined;
        return utils_1.int2hexlittle(this.crc);
    }
    get length() {
        if (!this._message)
            return undefined;
        return (this._message.length + 4) / 2;
    }
    get lengthHS() {
        if (!this._message)
            return undefined;
        return utils_1.int2hexlittle(this.length);
    }
    get payload() {
        return this._message;
    }
    set payload(payload) {
        this._message = payload;
    }
    get message() {
        if (!this._message)
            return undefined;
        return this._START + this.lengthHS + this._message + this.crcHS + this._END;
    }
    append(msg) {
        if (msg) {
            this._message = this._message ? this._message + msg.toLowerCase() : msg.toLowerCase();
        }
        return this;
    }
    prepend(msg) {
        if (msg) {
            this._message = this._message ? msg.toLowerCase() + this._message : msg.toLowerCase();
        }
        return this;
    }
    toString() {
        return this.message;
    }
    asBinaryBuffer() {
        let bufferArray = [];
        this.message.match(/.{1,1332}/g).forEach((part) => {
            bufferArray.push(Buffer.from(utils_1.unhexlify(part), 'binary'));
        });
        return bufferArray;
    }
}
exports.TimeboxEvoMessage = TimeboxEvoMessage;
