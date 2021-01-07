"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requests_1 = require("../requests");
const utils_1 = require("../helpers/utils");
class ScoreBoardChannel extends requests_1.TimeboxEvoRequest {
    /**
     * Generates the appropriate message to display the scoreboard
     * @param opts The options for the channel
     */
    constructor(opts) {
        super();
        this._opts = {
            red: 0,
            blue: 0
        };
        this._PACKAGE_PREFIX = "450600";
        this.red = opts && opts.red ? opts.red : 0;
        this.blue = opts && opts.blue ? opts.blue : 0;
    }
    /**
     * Updates the message queue based on the parameters used
     */
    _updateMessage() {
        this.clear();
        this.push(this._PACKAGE_PREFIX +
            utils_1.int2hexlittle(this._opts.red) +
            utils_1.int2hexlittle(this._opts.blue));
    }
    /**
     * Sets the red player score
     */
    set red(int) {
        this._opts.red = Math.min(999, Math.max(0, int));
        this._updateMessage();
    }
    /**
     * Gets the red player score
     */
    get red() {
        return this._opts.red;
    }
    /**
     * Sets the blue player score
     */
    set blue(int) {
        this._opts.blue = Math.min(999, Math.max(0, int));
        this._updateMessage();
    }
    /**
     * Gets the blue player score
     */
    get blue() {
        return this._opts.blue;
    }
}
exports.ScoreBoardChannel = ScoreBoardChannel;
