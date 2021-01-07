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
import { TimeDisplayType } from "../types";
import { TinyColor } from "@ctrl/tinycolor";
import { number2HexString, boolean2HexString, color2HexString } from "../helpers/utils";
var TimeChannel = (function (_super) {
    __extends(TimeChannel, _super);
    function TimeChannel(opts) {
        var _this = _super.call(this) || this;
        _this._opts = {
            type: TimeDisplayType.FullScreen,
            showTime: true,
            showWeather: false,
            showTemp: false,
            showCalendar: false
        };
        _this._PACKAGE_PREFIX = "450001";
        _this.color =
            opts && opts.color ? new TinyColor(opts.color) : new TinyColor("FFFFFF");
        _this._opts = __assign(__assign({}, _this._opts), opts);
        _this._updateMessage();
        return _this;
    }
    TimeChannel.prototype._updateMessage = function () {
        this.clear();
        this.push(this._PACKAGE_PREFIX +
            number2HexString(this._opts.type) +
            boolean2HexString(this._opts.showTime) +
            boolean2HexString(this._opts.showWeather) +
            boolean2HexString(this._opts.showTemp) +
            boolean2HexString(this._opts.showCalendar) +
            color2HexString(this._color));
    };
    Object.defineProperty(TimeChannel.prototype, "type", {
        get: function () {
            return this._opts.type;
        },
        set: function (type) {
            this._opts.type = type;
            this._updateMessage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeChannel.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (color) {
            var localcolor = new TinyColor(color);
            if (!localcolor.isValid)
                throw new Error("Provided color " + localcolor + " is not valid");
            this._color = localcolor.toHex();
            this._updateMessage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeChannel.prototype, "showTime", {
        get: function () {
            return this._opts.showTime;
        },
        set: function (bool) {
            this._opts.showTime = bool;
            this._updateMessage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeChannel.prototype, "showWeather", {
        get: function () {
            return this._opts.showWeather;
        },
        set: function (bool) {
            this._opts.showWeather = bool;
            this._updateMessage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeChannel.prototype, "showTemp", {
        get: function () {
            return this._opts.showTemp;
        },
        set: function (bool) {
            this._opts.showTemp = bool;
            this._updateMessage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeChannel.prototype, "showCalendar", {
        get: function () {
            return this._opts.showCalendar;
        },
        set: function (bool) {
            this._opts.showCalendar = bool;
            this._updateMessage();
        },
        enumerable: true,
        configurable: true
    });
    return TimeChannel;
}(TimeboxEvoRequest));
export { TimeChannel };
//# sourceMappingURL=time.js.map