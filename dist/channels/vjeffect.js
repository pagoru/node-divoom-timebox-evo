"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requests_1 = require("../requests");
const utils_1 = require("../helpers/utils");
class VJEffectChannel extends requests_1.TimeboxEvoRequest {
    /**
     * Generates the appropriate message to display the VJEffect Channel on the Divoom Timebox Evo
     * @param opts the VJEffect options
     */
    constructor(opts) {
        super();
        this._opts = {
            type: 0
        };
        this._PACKAGE_PREFIX = "4503";
        this._opts = Object.assign(Object.assign({}, this._opts), opts);
        this._updateMessage();
    }
    /**
     * Updates the message queue based on the parameters used
     */
    _updateMessage() {
        this.clear();
        this.push(this._PACKAGE_PREFIX + utils_1.number2HexString(this._opts.type));
    }
    set type(type) {
        this._opts.type = type;
        this._updateMessage();
    }
    get type() {
        return this._opts.type;
    }
}
exports.VJEffectChannel = VJEffectChannel;
