import { TimeboxEvoRequest } from "../requests";
import { LightningType } from "../types";
import { ColorInput } from "@ctrl/tinycolor";
/**
 * Options for the [[LightningChannel]]
 */
interface LightningOpts {
    type?: LightningType;
    color?: ColorInput;
    brightness?: number;
    power?: boolean;
}
/**
 * This class is used to display the Lightning Channel on the Timebox Evo
 */
export declare class LightningChannel extends TimeboxEvoRequest {
    private _opts;
    private _color;
    private _PACKAGE_PREFIX;
    private _PACKAGE_SUFFIX;
    /**
     * Generates the appropriate message to display the Lightning Channel on the Divoom Timebox Evo
     * @param opts the lightning options
     */
    constructor(opts?: LightningOpts);
    /**
     * Updates the message queue based on the parameters used
     */
    private _updateMessage;
    /**
     * Sets the type of Lightning you want to display
     */
    /**
    * Gets the type of Lightning
    */
    type: LightningType;
    /**
     * Sets the color of the Lightning
     */
    /**
    * Gets the color of the lightning
    */
    color: ColorInput;
    /**
     * Sets the power on of off
     */
    /** Gets the power */
    power: boolean;
    /**
     * Sets the brighness (0-100)
     */
    /**
    * Gets the brightness
    */
    brightness: number;
}
export {};
