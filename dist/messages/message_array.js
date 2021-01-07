"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TimeboxEvoMessageArray extends Array {
    constructor(items) {
        super(...items);
    }
    static create() {
        return Object.create(TimeboxEvoMessageArray.prototype);
    }
    asBinaryBuffer() {
        let bufferArray = [];
        this.forEach((slice) => {
            bufferArray = bufferArray.concat(slice.asBinaryBuffer());
        });
        return bufferArray;
    }
}
exports.TimeboxEvoMessageArray = TimeboxEvoMessageArray;
