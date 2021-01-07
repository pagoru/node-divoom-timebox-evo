import { TimeboxEvoMessageArray } from "./messages/message_array";
import { TimeboxEvoMessage } from "./messages/message";
var TimeboxEvoRequest = (function () {
    function TimeboxEvoRequest() {
        this._messages = TimeboxEvoMessageArray.create();
    }
    TimeboxEvoRequest.prototype.push = function (msg) {
        return this._messages.push(new TimeboxEvoMessage(msg));
    };
    TimeboxEvoRequest.prototype.clear = function () {
        this._messages = TimeboxEvoMessageArray.create();
    };
    Object.defineProperty(TimeboxEvoRequest.prototype, "messages", {
        get: function () {
            return this._messages;
        },
        enumerable: true,
        configurable: true
    });
    return TimeboxEvoRequest;
}());
export { TimeboxEvoRequest };
//# sourceMappingURL=requests.js.map