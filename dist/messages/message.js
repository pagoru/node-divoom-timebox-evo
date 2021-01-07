import { int2hexlittle, unhexlify } from "../helpers/utils";
var TimeboxEvoMessage = (function () {
    function TimeboxEvoMessage(msg) {
        if (msg === void 0) { msg = ''; }
        this._START = "01";
        this._END = "02";
        this.append(msg);
    }
    TimeboxEvoMessage.prototype._calcCRC = function () {
        if (!this._message)
            return undefined;
        var msg = this.lengthHS + this._message;
        var sum = 0;
        for (var i = 0, l = msg.length; i < l; i += 2) {
            sum += parseInt(msg.substr(i, 2), 16);
        }
        return sum % 65536;
    };
    Object.defineProperty(TimeboxEvoMessage.prototype, "crc", {
        get: function () {
            if (!this._message)
                return undefined;
            return this._calcCRC();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeboxEvoMessage.prototype, "crcHS", {
        get: function () {
            if (!this._message)
                return undefined;
            return int2hexlittle(this.crc);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeboxEvoMessage.prototype, "length", {
        get: function () {
            if (!this._message)
                return undefined;
            return (this._message.length + 4) / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeboxEvoMessage.prototype, "lengthHS", {
        get: function () {
            if (!this._message)
                return undefined;
            return int2hexlittle(this.length);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeboxEvoMessage.prototype, "payload", {
        get: function () {
            return this._message;
        },
        set: function (payload) {
            this._message = payload;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeboxEvoMessage.prototype, "message", {
        get: function () {
            if (!this._message)
                return undefined;
            return this._START + this.lengthHS + this._message + this.crcHS + this._END;
        },
        enumerable: true,
        configurable: true
    });
    TimeboxEvoMessage.prototype.append = function (msg) {
        if (msg) {
            this._message = this._message ? this._message + msg.toLowerCase() : msg.toLowerCase();
        }
        return this;
    };
    TimeboxEvoMessage.prototype.prepend = function (msg) {
        if (msg) {
            this._message = this._message ? msg.toLowerCase() + this._message : msg.toLowerCase();
        }
        return this;
    };
    TimeboxEvoMessage.prototype.toString = function () {
        return this.message;
    };
    TimeboxEvoMessage.prototype.asBinaryBuffer = function () {
        var bufferArray = [];
        this.message.match(/.{1,1332}/g).forEach(function (part) {
            bufferArray.push(Buffer.from(unhexlify(part), 'binary'));
        });
        return bufferArray;
    };
    return TimeboxEvoMessage;
}());
export { TimeboxEvoMessage };
//# sourceMappingURL=message.js.map