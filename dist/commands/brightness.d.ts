import { TimeboxEvoRequest } from "../requests";
/**
 * Options for the [[BrightnessCommand]]
 */
interface BrightnessOpts {
    brightness?: number;
    in_min?: number;
    in_max?: number;
}
export declare class BrightnessCommand extends TimeboxEvoRequest {
    /**
     * Default options
     */
    private _opts;
    private _PACKAGE_PREFIX;
    /**
     * Generates the appropriate message to change the brightness on the Divoom Timebox Evo
     * @param opts the brightness options
     */
    constructor(opts?: BrightnessOpts);
    brightness: number;
    in_min: number;
    in_max: number;
    opts: BrightnessOpts;
    /**
     * Updates the message queue based on the parameters used
     */
    private _updateMessage;
}
export {};
