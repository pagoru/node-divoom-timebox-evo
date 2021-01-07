import { TimeboxEvoRequest } from "../requests";
/**
 * Options for the [[ScoreBoardChannel]]
 */
interface ScoreBoardOptions {
    red?: number;
    blue?: number;
}
export declare class ScoreBoardChannel extends TimeboxEvoRequest {
    private _opts;
    private _PACKAGE_PREFIX;
    /**
     * Generates the appropriate message to display the scoreboard
     * @param opts The options for the channel
     */
    constructor(opts?: ScoreBoardOptions);
    /**
     * Updates the message queue based on the parameters used
     */
    private _updateMessage;
    /**
     * Sets the red player score
     */
    /**
    * Gets the red player score
    */
    red: number;
    /**
     * Sets the blue player score
     */
    /**
    * Gets the blue player score
    */
    blue: number;
}
export {};
