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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { TimeboxEvoRequest } from "../requests";
import { number2HexString } from "../helpers/utils";
import { TIMEBOX_CONST } from "../types";
var TempWeatherCommand = (function (_super) {
    __extends(TempWeatherCommand, _super);
    function TempWeatherCommand(opts) {
        var _this = _super.call(this) || this;
        _this._PACKAGE_PREFIX = "5F";
        _this._opts = {
            temperature: 0,
            weather: TIMEBOX_CONST.WeatherType.Clear
        };
        _this._opts = __assign(__assign({}, _this._opts), opts);
        _this.temperature = _this._opts.temperature;
        _this.weather = _this._opts.weather;
        return _this;
    }
    Object.defineProperty(TempWeatherCommand.prototype, "temperature", {
        get: function () {
            return this._opts.temperature;
        },
        set: function (temp) {
            if (temp > 128 || temp < -127) {
                throw new Error("temp should be >= -127 and <= 128");
            }
            this._opts.temperature = temp;
            this._updateMessage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TempWeatherCommand.prototype, "weather", {
        get: function () {
            return this._opts.weather;
        },
        set: function (weather) {
            this._opts.weather = weather;
            this._updateMessage();
        },
        enumerable: true,
        configurable: true
    });
    TempWeatherCommand.prototype._updateMessage = function () {
        this.clear();
        var encodedTemp = "";
        if (this._opts.temperature >= 0) {
            encodedTemp = number2HexString(this._opts.temperature);
        }
        else {
            var value = 256 + this._opts.temperature;
            encodedTemp = number2HexString(value);
        }
        this.push(this._PACKAGE_PREFIX + encodedTemp + number2HexString(this._opts.weather));
    };
    return TempWeatherCommand;
}(TimeboxEvoRequest));
export { TempWeatherCommand };
//# sourceMappingURL=temp_weather.js.map