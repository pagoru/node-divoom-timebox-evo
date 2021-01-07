"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requests_1 = require("../requests");
const utils_1 = require("../helpers/utils");
const types_1 = require("../types");
class TempWeatherCommand extends requests_1.TimeboxEvoRequest {
    constructor(opts) {
        super();
        this._PACKAGE_PREFIX = "5F";
        this._opts = {
            temperature: 0,
            weather: types_1.TIMEBOX_CONST.WeatherType.Clear
        };
        this._opts = Object.assign(Object.assign({}, this._opts), opts);
        this.temperature = this._opts.temperature;
        this.weather = this._opts.weather;
    }
    set temperature(temp) {
        if (temp > 128 || temp < -127) {
            throw new Error("temp should be >= -127 and <= 128");
        }
        this._opts.temperature = temp;
        this._updateMessage();
    }
    get temperature() {
        return this._opts.temperature;
    }
    set weather(weather) {
        this._opts.weather = weather;
        this._updateMessage();
    }
    get weather() {
        return this._opts.weather;
    }
    _updateMessage() {
        this.clear();
        let encodedTemp = "";
        if (this._opts.temperature >= 0) {
            encodedTemp = utils_1.number2HexString(this._opts.temperature);
        }
        else {
            let value = 256 + this._opts.temperature;
            encodedTemp = utils_1.number2HexString(value);
        }
        this.push(this._PACKAGE_PREFIX + encodedTemp + utils_1.number2HexString(this._opts.weather));
    }
}
exports.TempWeatherCommand = TempWeatherCommand;
