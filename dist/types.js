export var TimeDisplayType;
(function (TimeDisplayType) {
    TimeDisplayType[TimeDisplayType["FullScreen"] = 0] = "FullScreen";
    TimeDisplayType[TimeDisplayType["Rainbow"] = 1] = "Rainbow";
    TimeDisplayType[TimeDisplayType["WithBox"] = 2] = "WithBox";
    TimeDisplayType[TimeDisplayType["AnalogSquare"] = 3] = "AnalogSquare";
    TimeDisplayType[TimeDisplayType["FullScreenNegative"] = 4] = "FullScreenNegative";
    TimeDisplayType[TimeDisplayType["AnalogRound"] = 5] = "AnalogRound";
})(TimeDisplayType || (TimeDisplayType = {}));
export var LightningType;
(function (LightningType) {
    LightningType[LightningType["PlainColor"] = 0] = "PlainColor";
    LightningType[LightningType["Love"] = 1] = "Love";
    LightningType[LightningType["Plants"] = 2] = "Plants";
    LightningType[LightningType["NoMosquitto"] = 3] = "NoMosquitto";
    LightningType[LightningType["Sleeping"] = 4] = "Sleeping";
})(LightningType || (LightningType = {}));
export var WeatherType;
(function (WeatherType) {
    WeatherType[WeatherType["Clear"] = 1] = "Clear";
    WeatherType[WeatherType["CloudySky"] = 3] = "CloudySky";
    WeatherType[WeatherType["Thunderstorm"] = 5] = "Thunderstorm";
    WeatherType[WeatherType["Rain"] = 6] = "Rain";
    WeatherType[WeatherType["Snow"] = 8] = "Snow";
    WeatherType[WeatherType["Fog"] = 9] = "Fog";
})(WeatherType || (WeatherType = {}));
export var VJEffectType;
(function (VJEffectType) {
    VJEffectType[VJEffectType["Sparkles"] = 0] = "Sparkles";
    VJEffectType[VJEffectType["Lava"] = 1] = "Lava";
    VJEffectType[VJEffectType["VerticalRainbowLines"] = 2] = "VerticalRainbowLines";
    VJEffectType[VJEffectType["Drops"] = 3] = "Drops";
    VJEffectType[VJEffectType["RainbowSwirl"] = 4] = "RainbowSwirl";
    VJEffectType[VJEffectType["CMYFade"] = 5] = "CMYFade";
    VJEffectType[VJEffectType["RainbowLava"] = 6] = "RainbowLava";
    VJEffectType[VJEffectType["PastelPatterns"] = 7] = "PastelPatterns";
    VJEffectType[VJEffectType["CMYWave"] = 8] = "CMYWave";
    VJEffectType[VJEffectType["Fire"] = 9] = "Fire";
    VJEffectType[VJEffectType["Countdown"] = 10] = "Countdown";
    VJEffectType[VJEffectType["PinkBlueFade"] = 11] = "PinkBlueFade";
    VJEffectType[VJEffectType["RainbowPolygons"] = 12] = "RainbowPolygons";
    VJEffectType[VJEffectType["PinkBlueWave"] = 13] = "PinkBlueWave";
    VJEffectType[VJEffectType["RainbowCross"] = 14] = "RainbowCross";
    VJEffectType[VJEffectType["RainbowShapes"] = 15] = "RainbowShapes";
})(VJEffectType || (VJEffectType = {}));
export var TIMEBOX_CONST = {
    TimeType: TimeDisplayType,
    LightningType: LightningType,
    WeatherType: WeatherType,
    VJEffectType: VJEffectType
};
//# sourceMappingURL=types.js.map