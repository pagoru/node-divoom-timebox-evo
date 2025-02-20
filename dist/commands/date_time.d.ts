import { TimeboxEvoRequest } from "../requests";
/**
 * Options for the [[DateTimeCommand]]
 */
interface DateTimeOpts {
    date?: Date;
}
export declare class DateTimeCommand extends TimeboxEvoRequest {
    private _PACKAGE_PREFIX;
    private _opts;
    constructor(opts?: DateTimeOpts);
    date: Date;
    private _updateMessage;
}
export {};
