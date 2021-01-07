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
var BrightnessCommand = (function (_super) {
    __extends(BrightnessCommand, _super);
    function BrightnessCommand(opts) {
        var _this = _super.call(this) || this;
        _this._opts = {
            brightness: 100,
            in_min: 0,
            in_max: 100
        };
        _this._PACKAGE_PREFIX = "74";
        _this._opts = __assign(__assign({}, _this._opts), opts);
        _this._updateMessage();
        return _this;
    }
    Object.defineProperty(BrightnessCommand.prototype, "brightness", {
        get: function () {
            return this._opts.brightness;
        },
        set: function (brightness) {
            this._opts.brightness = brightness;
            this._updateMessage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrightnessCommand.prototype, "in_min", {
        get: function () {
            return this._opts.in_min;
        },
        set: function (in_min) {
            this._opts.in_min = in_min;
            this._updateMessage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrightnessCommand.prototype, "in_max", {
        get: function () {
            return this._opts.in_max;
        },
        set: function (in_max) {
            this._opts.in_max = in_max;
            this._updateMessage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrightnessCommand.prototype, "opts", {
        get: function () {
            return this._opts;
        },
        set: function (opts) {
            this._opts = __assign(__assign({}, this._opts), opts);
            this._updateMessage();
        },
        enumerable: true,
        configurable: true
    });
    BrightnessCommand.prototype._updateMessage = function () {
        function map(x, in_min, in_max, out_min, out_max) {
            if (x < in_min || x > in_max) {
                throw new Error("map() in_min is < value or in_max > value");
            }
            return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
        }
        if ((this._opts.brightness > 100 || this._opts.brightness < 0) &&
            (this._opts.in_min === undefined || this._opts.in_max === undefined)) {
            throw new Error("Brightness should be between 0 and 100 or in_min and in_max should be defined");
        }
        var briInRange = this._opts.brightness;
        if (this._opts.in_min !== undefined && this._opts.in_max !== undefined) {
            briInRange = Math.ceil(map(this._opts.brightness, this._opts.in_min, this._opts.in_max, 0, 100));
        }
        this.clear();
        this.push(this._PACKAGE_PREFIX + number2HexString(briInRange));
    };
    return BrightnessCommand;
}(TimeboxEvoRequest));
export { BrightnessCommand };
//# sourceMappingURL=brightness.js.map