"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPData = /** @class */ (function () {
    function IPData(ip, port, type, anonymous, site, survive, checkTime) {
        this.ip = ip;
        this.port = port;
        this.type = type;
        this.anonymous = anonymous;
        this.site = site;
        this.survive = survive;
        this.checkTime = checkTime;
    }
    return IPData;
}());
(function (IPData) {
    var Type;
    (function (Type) {
        Type[Type["HTTP"] = 0] = "HTTP";
        Type[Type["HTTPS"] = 1] = "HTTPS";
    })(Type = IPData.Type || (IPData.Type = {}));
})(IPData || (IPData = {}));
exports.default = IPData;
//# sourceMappingURL=IPData.js.map