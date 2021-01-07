import { TimeboxEvoRequest } from "../requests";
import { VJEffectType } from "../types";
/**
 * Options for the [[VJEffectChannel]]
 */
interface VJEffectOptions {
    type?: VJEffectType;
}
export declare class VJEffectChannel extends TimeboxEvoRequest {
    private _opts;
    private _PACKAGE_PREFIX;
    /**
     * Generates the appropriate message to display the VJEffect Channel on the Divoom Timebox Evo
     * @param opts the VJEffect options
     */
    constructor(opts?: VJEffectOptions);
    /**
     * Updates the message queue based on the parameters used
     */
    private _updateMessage;
    type: number;
}
export {};
