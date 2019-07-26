"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio = require("cheerio");
var RequestStatic_1 = __importDefault(require("../RequestStatic"));
var PoolBase = /** @class */ (function () {
    function PoolBase() {
        this.page = 1;
        this.data = new Array();
    }
    PoolBase.prototype.setPage = function (page) {
        this.page = page;
    };
    PoolBase.prototype.getPage = function () {
        return this.page;
    };
    PoolBase.prototype.nextPage = function () {
        this.page++;
    };
    PoolBase.prototype.prePage = function () {
        this.page--;
    };
    /**
     * 获取当前页数据
     *
     * @returns
     * @memberof PoolBase
     */
    PoolBase.prototype.getPageData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var list, html, promiseList, index, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        list = void 0;
                        if (!!this.data[this.page]) return [3 /*break*/, 2];
                        return [4 /*yield*/, RequestStatic_1.default.get(this.getAgreement() + this.getUrl())];
                    case 1:
                        html = _a.sent();
                        list = this.getIPData(cheerio.load(html));
                        return [3 /*break*/, 3];
                    case 2:
                        list = this.data[this.page];
                        _a.label = 3;
                    case 3:
                        promiseList = new Array();
                        for (index = 0; index < list.length; index++) {
                            promiseList.push(list[index].check());
                        }
                        return [4 /*yield*/, Promise.all(promiseList)];
                    case 4:
                        _a.sent();
                        result = list.filter(function (value) {
                            return value.isSurvive;
                        });
                        console.log("可用率", result.length / list.length);
                        return [2 /*return*/, result];
                    case 5:
                        error_1 = _a.sent();
                        console.error(error_1);
                        console.log("可用率", 0);
                        return [2 /*return*/, []];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return PoolBase;
}());
(function (PoolBase) {
    var AgreementType = /** @class */ (function () {
        function AgreementType() {
        }
        AgreementType.HTTP = "http://";
        AgreementType.HTTPS = "https://";
        return AgreementType;
    }());
    PoolBase.AgreementType = AgreementType;
})(PoolBase || (PoolBase = {}));
exports.default = PoolBase;
//# sourceMappingURL=PoolBase.js.map