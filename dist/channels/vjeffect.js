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
var VJEffectChannel = (function (_super) {
    __extends(VJEffectChannel, _super);
    function VJEffectChannel(opts) {
        var _this = _super.call(this) || this;
        _this._opts = {
            type: 0
        };
        _this._PACKAGE_PREFIX = "4503";
        _this._opts = __assign(__assign({}, _this._opts), opts);
        _this._updateMessage();
        return _this;
    }
    VJEffectChannel.prototype._updateMessage = function () {
        this.clear();
        this.push(this._PACKAGE_PREFIX + number2HexString(this._opts.type));
    };
    Object.defineProperty(VJEffectChannel.prototype, "type", {
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
    return VJEffectChannel;
}(TimeboxEvoRequest));
export { VJEffectChannel };
//# sourceMappingURL=vjeffect.js.map