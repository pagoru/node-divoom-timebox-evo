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
var CustomChannel = (function (_super) {
    __extends(CustomChannel, _super);
    function CustomChannel() {
        var _this = _super.call(this) || this;
        _this._PACKAGE_HEADER = "4505";
        _this.push(_this._PACKAGE_HEADER);
        return _this;
    }
    return CustomChannel;
}(TimeboxEvoRequest));
export { CustomChannel };
//# sourceMappingURL=custom.js.map