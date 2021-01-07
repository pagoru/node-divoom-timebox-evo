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
var DateTimeCommand = (function (_super) {
    __extends(DateTimeCommand, _super);
    function DateTimeCommand(opts) {
        var _this = _super.call(this) || this;
        _this._PACKAGE_PREFIX = "18";
        _this._opts = {
            date: new Date(),
        };
        _this._opts = __assign(__assign({}, _this._opts), opts);
        _this._updateMessage();
        return _this;
    }
    Object.defineProperty(DateTimeCommand.prototype, "date", {
        get: function () {
            return this._opts.date;
        },
        set: function (date) {
            this._opts.date = date;
            this._updateMessage();
        },
        enumerable: true,
        configurable: true
    });
    DateTimeCommand.prototype._updateMessage = function () {
        this.clear();
        var timeString = number2HexString(Number(this._opts.date.getFullYear().toString().padStart(4, "0").slice(2)))
            + number2HexString(Number(this._opts.date.getFullYear().toString().padStart(4, "0").slice(0, 2)))
            + number2HexString(this._opts.date.getMonth() + 1)
            + number2HexString(this._opts.date.getDate())
            + number2HexString(this._opts.date.getHours())
            + number2HexString(this._opts.date.getMinutes())
            + number2HexString(this._opts.date.getSeconds())
            + "00";
        this.push(this._PACKAGE_PREFIX + timeString);
    };
    return DateTimeCommand;
}(TimeboxEvoRequest));
export { DateTimeCommand };
//# sourceMappingURL=date_time.js.map