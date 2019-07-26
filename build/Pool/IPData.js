"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPData = /** @class */ (function () {
    function IPData(ip, port, type, anonymous, site) {
        this.ip = "";
        this.port = "";
        this.type = IPData.Type.HTTP;
        this.anonymous = false;
        this.site = "";
        this.checkTime = new Date();
        this.isSurvive = false;
        this.ip = ip;
        this.port = port;
        this.type = type;
        this.anonymous = anonymous;
        this.site = site;
        this.check();
    }
    IPData.prototype.check = function () {
        this.isSurvive = true;
        this.checkTime = new Date();
    };
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