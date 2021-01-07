/// <reference types="node" />
import { TimeboxEvoRequest } from "../requests";
import { JimpArray } from "./jimp_overloads";
export interface DisplayAnimationOpts {
    size?: 16 | 32;
}
export declare class DisplayAnimation extends TimeboxEvoRequest {
    private _opts;
    readonly size: number;
    constructor(opts?: DisplayAnimationOpts);
    read(input: string | Buffer): Promise<JimpArray>;
    private _displayImage;
    private _displayAnimationFromGIF;
}
