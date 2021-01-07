"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requests_1 = require("../requests");
const types_1 = require("../types");
const tinycolor_1 = require("@ctrl/tinycolor");
const utils_1 = require("../helpers/utils");
/**
 * This class is used to display the Lightning Channel on the Timebox Evo
 */
class LightningChannel extends requests_1.TimeboxEvoRequest {
    /**
     * Generates the appropriate message to display the Lightning Channel on the Divoom Timebox Evo
     * @param opts the lightning options
     */
    constructor(opts) {
        super();
        this._opts = {
            type: types_1.LightningType.PlainColor,
            brightness: 100,
            power: true
        };
        this._PACKAGE_PREFIX = "4501";
        this._PACKAGE_SUFFIX = "000000";
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
            utils_1.color2HexString(this._color) +
            utils_1.brightness2HexString(this._opts.brightness) +
            utils_1.number2HexString(this._opts.type) +
            utils_1.boolean2HexString(this._opts.power) +
            this._PACKAGE_SUFFIX);
    }
    /**
     * Sets the type of Lightning you want to display
     */
    set type(type) {
        this._opts.type = type;
        this._updateMessage();
    }
    /**
     * Gets the type of Lightning
     */
    get type() {
        return this._opts.type;
    }
    /**
     * Sets the color of the Lightning
     */
    set color(color) {
        const localcolor = new tinycolor_1.TinyColor(color);
        if (!localcolor.isValid)
            throw new Error(`Provided color ${localcolor} is not valid`);
        this._color = localcolor.toHex();
        this._updateMessage();
    }
    /**
     * Gets the color of the lightning
     */
    get color() {
        return this._color;
    }
    /**
     * Sets the power on of off
     */
    set power(bool) {
        this._opts.power = bool;
        this._updateMessage();
    }
    /** Gets the power */
    get power() {
        return this._opts.power;
    }
    /**
     * Sets the brighness (0-100)
     */
    set brightness(brightness) {
        this._opts.brightness = brightness;
        this._updateMessage();
    }
    /**
     * Gets the brightness
     */
    get brightness() {
        return this._opts.brightness;
    }
}
exports.LightningChannel = LightningChannel;
