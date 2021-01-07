"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requests_1 = require("../requests");
class CustomChannel extends requests_1.TimeboxEvoRequest {
    /**
     * Generates the appropriate message to display the Custom Channel
     */
    constructor() {
        super();
        this._PACKAGE_HEADER = "4505";
        this.push(this._PACKAGE_HEADER);
    }
}
exports.CustomChannel = CustomChannel;
