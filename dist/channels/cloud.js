"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requests_1 = require("../requests");
class CloudChannel extends requests_1.TimeboxEvoRequest {
    /**
     * Generates the appropriate message to display the Cloud Channel
     */
    constructor() {
        super();
        this.push("4502");
    }
}
exports.CloudChannel = CloudChannel;
