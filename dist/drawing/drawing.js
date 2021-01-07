var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { TimeboxEvoRequest } from "../requests";
import fs from "fs";
import fileType from "file-type";
import Jimp from "jimp";
import gifWrap from "gifwrap";
import { JimpArray, DivoomJimpStatic, DivoomJimpAnim } from "./jimp_overloads";
var DisplayAnimation = (function (_super) {
    __extends(DisplayAnimation, _super);
    function DisplayAnimation(size) {
        if (size === void 0) { size = 32; }
        var _this = _super.call(this) || this;
        _this.size = size;
        return _this;
    }
    DisplayAnimation.prototype.read = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var buffer, ft, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (Buffer.isBuffer(input)) {
                            buffer = input;
                        }
                        else {
                            buffer = fs.readFileSync(input);
                        }
                        ft = fileType(buffer);
                        ft = fileType(buffer);
                        if (!ft) return [3, 7];
                        _a = ft.mime;
                        switch (_a) {
                            case "image/gif": return [3, 1];
                            case "image/jpeg": return [3, 3];
                            case "image/png": return [3, 3];
                            case "image/bmp": return [3, 3];
                        }
                        return [3, 5];
                    case 1: return [4, this._displayAnimationFromGIF(buffer)];
                    case 2: return [2, _b.sent()];
                    case 3: return [4, this._displayImage(buffer)];
                    case 4: return [2, _b.sent()];
                    case 5: throw new Error("file type not supported");
                    case 6: return [3, 8];
                    case 7: throw new Error("file type unkown");
                    case 8: return [2];
                }
            });
        });
    };
    DisplayAnimation.prototype._displayImage = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var ja, image, resized;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ja = JimpArray.create();
                        return [4, Jimp.read(input)];
                    case 1:
                        image = _a.sent();
                        resized = new DivoomJimpStatic(image.resize(this.size, this.size, Jimp.RESIZE_NEAREST_NEIGHBOR));
                        ja.push(resized);
                        return [2, ja];
                }
            });
        });
    };
    DisplayAnimation.prototype._displayAnimationFromGIF = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var gifCodec, inputGif, ja;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gifCodec = new gifWrap.GifCodec();
                        return [4, gifCodec.decodeGif(input)];
                    case 1:
                        inputGif = _a.sent();
                        ja = JimpArray.create();
                        inputGif.frames.forEach(function (frame, index) {
                            var image = gifWrap.GifUtil.copyAsJimp(DivoomJimpAnim, frame).resize(_this.size, _this.size);
                            image.delay = frame.delayCentisecs * 10;
                            image.frame = index;
                            ja.push(image);
                        });
                        return [2, ja];
                }
            });
        });
    };
    return DisplayAnimation;
}(TimeboxEvoRequest));
export { DisplayAnimation };
//# sourceMappingURL=drawing.js.map