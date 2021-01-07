import { TimeboxEvoRequest } from "../requests";
import { TimeDisplayType } from "../types";
import { ColorInput } from "@ctrl/tinycolor";
/**
 * Options for the [[TimeChannel]]
 */
interface TimeOptions {
    type?: TimeDisplayType;
    color?: ColorInput;
    showTime?: boolean;
    showWeather?: boolean;
    showTemp?: boolean;
    showCalendar?: boolean;
}
export declare class TimeChannel extends TimeboxEvoRequest {
    private _opts;
    private _color;
    private _PACKAGE_PREFIX;
    /**
     * Generates the appropriate message to display the Time Channel on the Divoom Timebox Evo
     * @param opts the time options
     */
    constructor(opts?: TimeOptions);
    /**
     * Updates the message queue based on the parameters used
     */
    private _updateMessage;
    type: TimeDisplayType;
    color: ColorInput;
    showTime: boolean;
    showWeather: boolean;
    showTemp: boolean;
    showCalendar: boolean;
}
export {};
