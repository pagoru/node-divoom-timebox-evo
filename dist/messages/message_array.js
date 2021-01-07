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
var TimeboxEvoMessageArray = (function (_super) {
    __extends(TimeboxEvoMessageArray, _super);
    function TimeboxEvoMessageArray(items) {
        return _super.apply(this, items) || this;
    }
    TimeboxEvoMessageArray.create = function () {
        return Object.create(TimeboxEvoMessageArray.prototype);
    };
    TimeboxEvoMessageArray.prototype.asBinaryBuffer = function () {
        var bufferArray = [];
        this.forEach(function (slice) {
            bufferArray = bufferArray.concat(slice.asBinaryBuffer());
        });
        return bufferArray;
    };
    return TimeboxEvoMessageArray;
}(Array));
export { TimeboxEvoMessageArray };
//# sourceMappingURL=message_array.js.map