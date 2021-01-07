import { TimeboxEvoRequest } from "./requests";
import { TimeChannel, LightningChannel, VJEffectChannel, ScoreBoardChannel, CloudChannel, CustomChannel } from "./channels/exports";
import { BrightnessCommand, TempWeatherCommand, DateTimeCommand } from "./commands/exports";
import { DisplayText } from "./drawing/text";
import { DisplayAnimation } from "./drawing/drawing";
export * from "./channels/exports";
export * from "./commands/exports";
export * from "./drawing/exports";
export * from "./requests";
export { TIMEBOX_CONST } from "./types";
var TimeboxEvo = (function () {
    function TimeboxEvo() {
    }
    TimeboxEvo.prototype.createRequest = function (type, opts) {
        switch (type.toLowerCase()) {
            case "cloud":
                return new CloudChannel();
            case "custom":
                return new CustomChannel();
            case "lightning":
                return new LightningChannel(opts);
            case "scoreboard":
                return new ScoreBoardChannel(opts);
            case "time":
                return new TimeChannel(opts);
            case "vj-effect":
            case "vjeffect":
                return new VJEffectChannel(opts);
            case "brightness":
                return new BrightnessCommand(opts);
            case "temp_weather":
                return new TempWeatherCommand(opts);
            case "text":
                return new DisplayText(opts);
            case "picture":
            case "animation":
                return new DisplayAnimation(opts);
            case "datetime":
                return new DateTimeCommand(opts);
            case "raw":
                return new TimeboxEvoRequest();
            default:
                throw new Error("Unkown type");
        }
    };
    return TimeboxEvo;
}());
export { TimeboxEvo };
//# sourceMappingURL=index.js.map