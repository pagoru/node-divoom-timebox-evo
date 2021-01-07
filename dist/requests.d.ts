import { TimeboxEvoMessageArray } from "./messages/message_array";
/**
 * Generic class to communicate with the Timebox Evo
 */
export declare class TimeboxEvoRequest {
    private _messages;
    /**
     * This queues a message in the message queue
     * @param msg the message to append in the message queue
     * @returns the length of the message queue
     */
    push(msg: string): number;
    /**
     * Clears the message queue
     */
    clear(): void;
    /**
     * Returns the message queue
     * @returns The message queue
     */
    readonly messages: TimeboxEvoMessageArray;
}
