"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requests_1 = require("../requests");
const utils_1 = require("../helpers/utils");
class BrightnessCommand extends requests_1.TimeboxEvoRequest {
    /**
     * Generates the appropriate message to change the brightness on the Divoom Timebox Evo
     * @param opts the brightness options
     */
    constructor(opts) {
        super();
        /**
         * Default options
         */
        this._opts = {
            /**
             * default is 100
             */
            brightness: 100,
            /**
             * default is 0
             */
            in_min: 0,
            /**
             * default is 100
             */
            in_max: 100
        };
        this._PACKAGE_PREFIX = "74";
        this._opts = Object.assign(Object.assign({}, this._opts), opts);
        this._updateMessage();
    }
    set brightness(brightness) {
        this._opts.brightness = brightness;
        this._updateMessage();
    }
    get brightness() {
        return this._opts.brightness;
    }
    set in_min(in_min) {
        this._opts.in_min = in_min;
        this._updateMessage();
    }
    get in_min() {
        return this._opts.in_min;
    }
    set in_max(in_max) {
        this._opts.in_max = in_max;
        this._updateMessage();
    }
    get in_max() {
        return this._opts.in_max;
    }
    set opts(opts) {
        this._opts = Object.assign(Object.assign({}, this._opts), opts);
        this._updateMessage();
    }
    get opts() {
        return this._opts;
    }
    /**
     * Updates the message queue based on the parameters used
     */
    _updateMessage() {
        function map(x, in_min, in_max, out_min, out_max) {
            if (x < in_min || x > in_max) {
                throw new Error("map() in_min is < value or in_max > value");
            }
            return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
        }
        if ((this._opts.brightness > 100 || this._opts.brightness < 0) &&
            (this._opts.in_min === undefined || this._opts.in_max === undefined)) {
            throw new Error("Brightness should be between 0 and 100 or in_min and in_max should be defined");
        }
        let briInRange = this._opts.brightness;
        if (this._opts.in_min !== undefined && this._opts.in_max !== undefined) {
            briInRange = Math.ceil(map(this._opts.brightness, this._opts.in_min, this._opts.in_max, 0, 100));
        }
        this.clear();
        this.push(this._PACKAGE_PREFIX + utils_1.number2HexString(briInRange));
    }
}
exports.BrightnessCommand = BrightnessCommand;
