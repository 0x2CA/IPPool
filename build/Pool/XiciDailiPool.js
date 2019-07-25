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
var XiciDailiPool = /** @class */ (function (_super) {
    __extends(XiciDailiPool, _super);
    function XiciDailiPool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XiciDailiPool.prototype.getUrl = function () {
        return "https://www.xicidaili.com/nn/" + this.page;
    };
    XiciDailiPool.prototype.getPoolData = function ($) {
        var result = new Array();
        $("table#ip_list tbody tr").each(function (index, element) {
            var info = $(element)
                .text()
                .replace(/(  |\n| |\n      )*/, ",")
                .split(",")
                .filter(function (value) {
                return value != "";
            });
            // let type = info.search(/HTTPS/) >= 0 ? IPData.Type.HTTPS : IPData.Type.HTTP;
            console.log(JSON.stringify(info));
            // try {
            // 	let ip = new RegExp(/[^	]([0-9]{1,4}|.){7}/).exec(info)[0];
            // } catch (error) {}
        });
        return [];
    };
    return XiciDailiPool;
}(PoolBase_1.default));
exports.default = XiciDailiPool;
//# sourceMappingURL=XiciDailiPool.js.map