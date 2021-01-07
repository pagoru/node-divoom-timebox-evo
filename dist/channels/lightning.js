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
import { LightningType } from "../types";
import { TinyColor } from "@ctrl/tinycolor";
import { color2HexString, brightness2HexString, number2HexString, boolean2HexString } from "../helpers/utils";
var LightningChannel = (function (_super) {
    __extends(LightningChannel, _super);
    function LightningChannel(opts) {
        var _this = _super.call(this) || this;
        _this._opts = {
            type: LightningType.PlainColor,
            brightness: 100,
            power: true
        };
        _this._PACKAGE_PREFIX = "4501";
        _this._PACKAGE_SUFFIX = "000000";
        _this.color =
            opts && opts.color ? new TinyColor(opts.color) : new TinyColor("FFFFFF");
        _this._opts = __assign(__assign({}, _this._opts), opts);
        _this._updateMessage();
        return _this;
    }
    LightningChannel.prototype._updateMessage = function () {
        this.clear();
        this.push(this._PACKAGE_PREFIX +
            color2HexString(this._color) +
            brightness2HexString(this._opts.brightness) +
            number2HexString(this._opts.type) +
            boolean2HexString(this._opts.power) +
            this._PACKAGE_SUFFIX);
    };
    Object.defineProperty(LightningChannel.prototype, "type", {
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
    Object.defineProperty(LightningChannel.prototype, "color", {
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
    Object.defineProperty(LightningChannel.prototype, "power", {
        get: function () {
            return this._opts.power;
        },
        set: function (bool) {
            this._opts.power = bool;
            this._updateMessage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightningChannel.prototype, "brightness", {
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
    return LightningChannel;
}(TimeboxEvoRequest));
export { LightningChannel };
//# sourceMappingURL=lightning.js.map