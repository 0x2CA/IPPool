"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PoolBase_1 = __importDefault(require("./PoolBase"));
var IPData_1 = __importDefault(require("./IPData"));
var KuaiDailiPool = /** @class */ (function (_super) {
    __extends(KuaiDailiPool, _super);
    function KuaiDailiPool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KuaiDailiPool.prototype.getAgreement = function () {
        return PoolBase_1.default.AgreementType.HTTPS;
    };
    KuaiDailiPool.prototype.getUrl = function () {
        return "www.kuaidaili.com/free/inha/" + this.page;
    };
    KuaiDailiPool.prototype.getIPData = function (info) {
        var ip = "";
        var port = "";
        var anonymous = false;
        var checkTime = "";
        var survive = "";
        var site = "";
        var type = IPData_1.default.AgreementType.HTTP;
        if (info[0]) {
            ip = info[0];
        }
        if (info[1]) {
            port = info[1];
        }
        if (info[2]) {
            anonymous = info[2] == "高匿名";
        }
        if (info[3]) {
            type = info[3] == "HTTPS" ? IPData_1.default.AgreementType.HTTPS : IPData_1.default.AgreementType.HTTP;
        }
        if (info[4]) {
            site = info[4];
        }
        if (info[5]) {
            survive = info[5];
        }
        if (info[6]) {
            checkTime = info[6];
        }
        return new IPData_1.default(ip, port, type, anonymous, site);
    };
    return KuaiDailiPool;
}(PoolBase_1.default));
exports.default = KuaiDailiPool;
//# sourceMappingURL=KuaiDailiPool.js.map