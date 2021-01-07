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
var CloudChannel = (function (_super) {
    __extends(CloudChannel, _super);
    function CloudChannel() {
        var _this = _super.call(this) || this;
        _this.push("4502");
        return _this;
    }
    return CloudChannel;
}(TimeboxEvoRequest));
export { CloudChannel };
//# sourceMappingURL=cloud.js.map