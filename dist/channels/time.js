"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requests_1 = require("../requests");
const types_1 = require("../types");
const tinycolor_1 = require("@ctrl/tinycolor");
const utils_1 = require("../helpers/utils");
class TimeChannel extends requests_1.TimeboxEvoRequest {
    /**
     * Generates the appropriate message to display the Time Channel on the Divoom Timebox Evo
     * @param opts the time options
     */
    constructor(opts) {
        super();
        this._opts = {
            type: types_1.TimeDisplayType.FullScreen,
            showTime: true,
            showWeather: false,
            showTemp: false,
            showCalendar: false
        };
        this._PACKAGE_PREFIX = "450001";
        this.color =
            opts && opts.color ? new tinycolor_1.TinyColor(opts.color) : new tinycolor_1.TinyColor("FFFFFF");
        this._opts = Object.assign(Object.assign({}, this._opts), opts);
        this._updateMessage();
    }
    /**
     * Updates the message queue based on the parameters used
     */
    _updateMessage() {
        this.clear();
        this.push(this._PACKAGE_PREFIX +
            utils_1.number2HexString(this._opts.type) +
            utils_1.boolean2HexString(this._opts.showTime) +
            utils_1.boolean2HexString(this._opts.showWeather) +
            utils_1.boolean2HexString(this._opts.showTemp) +
            utils_1.boolean2HexString(this._opts.showCalendar) +
            utils_1.color2HexString(this._color));
    }
    set type(type) {
        this._opts.type = type;
        this._updateMessage();
    }
    get type() {
        return this._opts.type;
    }
    set color(color) {
        const localcolor = new tinycolor_1.TinyColor(color);
        if (!localcolor.isValid)
            throw new Error(`Provided color ${localcolor} is not valid`);
        this._color = localcolor.toHex();
        this._updateMessage();
    }
    get color() {
        return this._color;
    }
    set showTime(bool) {
        this._opts.showTime = bool;
        this._updateMessage();
    }
    get showTime() {
        return this._opts.showTime;
    }
    set showWeather(bool) {
        this._opts.showWeather = bool;
        this._updateMessage();
    }
    get showWeather() {
        return this._opts.showWeather;
    }
    set showTemp(bool) {
        this._opts.showTemp = bool;
        this._updateMessage();
    }
    get showTemp() {
        return this._opts.showTemp;
    }
    set showCalendar(bool) {
        this._opts.showCalendar = bool;
        this._updateMessage();
    }
    get showCalendar() {
        return this._opts.showCalendar;
    }
}
exports.TimeChannel = TimeChannel;
