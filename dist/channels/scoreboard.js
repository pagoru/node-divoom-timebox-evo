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
import { TimeboxEvoRequest } from "../requests";
import { int2hexlittle } from "../helpers/utils";
var ScoreBoardChannel = (function (_super) {
    __extends(ScoreBoardChannel, _super);
    function ScoreBoardChannel(opts) {
        var _this = _super.call(this) || this;
        _this._opts = {
            red: 0,
            blue: 0
        };
        _this._PACKAGE_PREFIX = "450600";
        _this.red = opts && opts.red ? opts.red : 0;
        _this.blue = opts && opts.blue ? opts.blue : 0;
        return _this;
    }
    ScoreBoardChannel.prototype._updateMessage = function () {
        this.clear();
        this.push(this._PACKAGE_PREFIX +
            int2hexlittle(this._opts.red) +
            int2hexlittle(this._opts.blue));
    };
    Object.defineProperty(ScoreBoardChannel.prototype, "red", {
        get: function () {
            return this._opts.red;
        },
        set: function (int) {
            this._opts.red = Math.min(999, Math.max(0, int));
            this._updateMessage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScoreBoardChannel.prototype, "blue", {
        get: function () {
            return this._opts.blue;
        },
        set: function (int) {
            this._opts.blue = Math.min(999, Math.max(0, int));
            this._updateMessage();
        },
        enumerable: true,
        configurable: true
    });
    return ScoreBoardChannel;
}(TimeboxEvoRequest));
export { ScoreBoardChannel };
//# sourceMappingURL=scoreboard.js.map