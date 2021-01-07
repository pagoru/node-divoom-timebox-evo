/// <reference types="node" />
import { TimeboxEvoRequest } from "../requests";
import { JimpArray } from "./jimp_overloads";
/**
 * Options for the [[DisplayAnimation]]
 */
export interface DisplayAnimationOpts {
    size?: 16 | 32;
}
export declare class DisplayAnimation extends TimeboxEvoRequest {
    private _opts;
    constructor(opts?: DisplayAnimationOpts);
    /**
     * Reads an image and returns a promise of [[JimpArray]]. It works with gif, jpeg, png and bmp
     * @param input a filepath to an image or a buffer reprensenting an image
     * @returns a promse of [[JimpArray]]
     *
     * ```typescript
     * d.read(msg.buffer).then(result => {
     *   node.send({ payload: result.asBinaryBuffer() });
     * }).catch(err => {
     *   throw err
     * })
     * ```
     */
    read(input: string | Buffer): Promise<JimpArray>;
    /**
     * This function generates the message when the a static image is used
     * @param input a Buffer representing an image file
     * @returns A promise which resolves when the processing is done
     */
    private _displayImage;
    /**
     * This function generates the message when the a static image is used
     * @param input Buffer representing an image file
     * @returns A promise which resolves when the processing is done
     */
    private _displayAnimationFromGIF;
}
