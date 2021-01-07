"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requests_1 = require("../requests");
const utils_1 = require("../helpers/utils");
class DateTimeCommand extends requests_1.TimeboxEvoRequest {
    constructor(opts) {
        super();
        this._PACKAGE_PREFIX = "18";
        this._opts = {
            date: new Date(),
        };
        this._opts = Object.assign(Object.assign({}, this._opts), opts);
        this._updateMessage();
    }
    set date(date) {
        this._opts.date = date;
        this._updateMessage();
    }
    get date() {
        return this._opts.date;
    }
    _updateMessage() {
        this.clear();
        let timeString = utils_1.number2HexString(Number(this._opts.date.getFullYear().toString().padStart(4, "0").slice(2)))
            + utils_1.number2HexString(Number(this._opts.date.getFullYear().toString().padStart(4, "0").slice(0, 2)))
            + utils_1.number2HexString(this._opts.date.getMonth() + 1)
            + utils_1.number2HexString(this._opts.date.getDate())
            + utils_1.number2HexString(this._opts.date.getHours())
            + utils_1.number2HexString(this._opts.date.getMinutes())
            + utils_1.number2HexString(this._opts.date.getSeconds())
            + "00";
        this.push(this._PACKAGE_PREFIX + timeString);
    }
}
exports.DateTimeCommand = DateTimeCommand;
