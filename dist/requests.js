"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_array_1 = require("./messages/message_array");
const message_1 = require("./messages/message");
/**
 * Generic class to communicate with the Timebox Evo
 */
class TimeboxEvoRequest {
    constructor() {
        this._messages = message_array_1.TimeboxEvoMessageArray.create();
    }
    /**
     * This queues a message in the message queue
     * @param msg the message to append in the message queue
     * @returns the length of the message queue
     */
    push(msg) {
        return this._messages.push(new message_1.TimeboxEvoMessage(msg));
    }
    /**
     * Clears the message queue
     */
    clear() {
        this._messages = message_array_1.TimeboxEvoMessageArray.create();
    }
    /**
     * Returns the message queue
     * @returns The message queue
     */
    get messages() {
        return this._messages;
    }
}
exports.TimeboxEvoRequest = TimeboxEvoRequest;
