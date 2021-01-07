"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const requests_1 = require("./requests");
const exports_1 = require("./channels/exports");
const exports_2 = require("./commands/exports");
const text_1 = require("./drawing/text");
const drawing_1 = require("./drawing/drawing");
__export(require("./channels/exports"));
__export(require("./commands/exports"));
__export(require("./drawing/exports"));
__export(require("./requests"));
var types_1 = require("./types");
exports.TIMEBOX_CONST = types_1.TIMEBOX_CONST;
/**
 * This class instanciate the proper class to communicate with the Timebox Evo
 */
class TimeboxEvo {
    /**
     * Returns an instance of the class required to communicate with the Timebox Evo
     * @param type type of request. Can be any of: `cloud`, `custom`, `lightning`, `scoreboard`, `time`, `vjeffect`, `brightness`, `temp_weather`, `text`, `picture`, `animation`, `datetime`, `raw`
     * @param opts optional parameter for the `type`. See each class' documentation for details
     * @returns the proper class instance
     */
    createRequest(type, opts) {
        switch (type.toLowerCase()) {
            case "cloud":
                return new exports_1.CloudChannel();
            case "custom":
                return new exports_1.CustomChannel();
            case "lightning":
                return new exports_1.LightningChannel(opts);
            case "scoreboard":
                return new exports_1.ScoreBoardChannel(opts);
            case "time":
                return new exports_1.TimeChannel(opts);
            case "vj-effect":
            case "vjeffect":
                return new exports_1.VJEffectChannel(opts);
            case "brightness":
                return new exports_2.BrightnessCommand(opts);
            case "temp_weather":
                return new exports_2.TempWeatherCommand(opts);
            case "text":
                return new text_1.DisplayText(opts);
            case "picture":
            case "animation":
                return new drawing_1.DisplayAnimation(opts);
            case "datetime":
                return new exports_2.DateTimeCommand(opts);
            case "raw":
                return new requests_1.TimeboxEvoRequest();
            default:
                throw new Error("Unkown type");
        }
    }
}
exports.TimeboxEvo = TimeboxEvo;
