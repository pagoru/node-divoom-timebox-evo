import { TimeboxEvoRequest } from "../requests";
import * as fs from "fs";
import * as fileType from "file-type";
import * as Jimp from "jimp";
import * as gifWrap from "gifwrap";
import { JimpArray, DivoomJimpStatic, DivoomJimpAnim } from "./jimp_overloads";

/**
 * Options for the [[DisplayAnimation]]
 */
export interface DisplayAnimationOpts {
  size?: 16 | 32
}

export class DisplayAnimation extends TimeboxEvoRequest {
  private _opts: DisplayAnimationOpts = {
    size: 32
  };

  constructor(opts?: DisplayAnimationOpts) {
    super();
    this._opts = opts;
  }


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
  public async read(input: string | Buffer): Promise<JimpArray> {
    let buffer: Buffer;
    if (Buffer.isBuffer(input)) {
      buffer = input;
    } else {
      buffer = fs.readFileSync(input);
    }

    let ft: fileType.FileTypeResult | undefined = fileType(buffer);
    ft = fileType(buffer);

    if (ft) {
      switch (ft.mime) {
        case "image/gif":
          return await this._displayAnimationFromGIF(buffer);
        case "image/jpeg":
        case "image/png":
        case "image/bmp":
          return await this._displayImage(buffer);
        default:
          throw new Error("file type not supported");
      }
    } else {
      throw new Error("file type unkown");
    }
  }

  /**
   * This function generates the message when the a static image is used
   * @param input a Buffer representing an image file
   * @returns A promise which resolves when the processing is done
   */
  private async _displayImage(input: Buffer): Promise<JimpArray> {
    let ja = JimpArray.create();
    const image = await Jimp.read(input);
    let resized = new DivoomJimpStatic(
      image.resize(this._opts.size, this._opts.size, Jimp.RESIZE_NEAREST_NEIGHBOR)
    );
    ja.push(resized);
    return ja;
  }

  /**
   * This function generates the message when the a static image is used
   * @param input Buffer representing an image file
   * @returns A promise which resolves when the processing is done
   */
  private async _displayAnimationFromGIF(input: Buffer): Promise<JimpArray> {
    let gifCodec = new gifWrap.GifCodec();
    const inputGif = await gifCodec.decodeGif(input);
    let ja = JimpArray.create();
    inputGif.frames.forEach((frame, index) => {
      let image = (gifWrap.GifUtil.copyAsJimp(
        DivoomJimpAnim,
        frame
      ) as DivoomJimpAnim).resize(this._opts.size, this._opts.size);
      image.delay = frame.delayCentisecs * 10;
      image.frame = index;
      ja.push(image);
    });
    return ja;
  }
}
