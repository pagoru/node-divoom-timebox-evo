/// <reference types="node" />
import { TimeboxEvoRequest } from "../requests";
import { JimpArray } from "./jimp_overloads";
export declare class DisplayAnimation extends TimeboxEvoRequest {
    readonly size: number;
    constructor(size?: number);
    read(input: string | Buffer): Promise<JimpArray>;
    private _displayImage;
    private _displayAnimationFromGIF;
}
