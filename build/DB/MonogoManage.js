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
var MongoDB = require("mongodb");
var DBManage_1 = __importDefault(require("./DBManage"));
var MongoClient = MongoDB.MongoClient;
var MonogoManage = /** @class */ (function (_super) {
    __extends(MonogoManage, _super);
    function MonogoManage(dbHost, dbPort, dbName, dbUser, dbPasswd) {
        var _this = _super.call(this) || this;
        _this.db = null;
        _this.dbHost = dbHost;
        _this.dbPort = dbPort;
        _this.dbName = dbName;
        if (dbUser && dbPasswd) {
            _this.dbUser = dbUser;
            _this.dbPasswd = dbPasswd;
            _this.dbSrc = "mongodb://" + _this.dbUser + ":" + _this.dbPasswd + "@" + _this.dbHost + ":" + _this.dbPort + "/" + _this.dbName;
        }
        else {
            _this.dbSrc = "mongodb://" + _this.dbHost + ":" + _this.dbPort + "/" + _this.dbName;
        }
        console.log(_this.dbSrc);
        return _this;
    }
    MonogoManage.prototype.connect = function () {
        var _this = this;
        if (this.dbType == MonogoManage.DBType.OPEN) {
            return Promise.resolve(this.db);
        }
        else {
            return new Promise(function (resolve, reject) {
                console.log("连接数据库!");
                MongoClient.connect(_this.dbSrc, { useNewUrlParser: true }, function (err, db) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        _this.db = db;
                        _this.dbType = MonogoManage.DBType.OPEN;
                        console.log("连接成功!");
                        resolve(db);
                    }
                });
            });
        }
    };
    MonogoManage.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.dbType == MonogoManage.DBType.OPEN && this.db)) return [3 /*break*/, 2];
                        console.log("断开数据库!");
                        return [4 /*yield*/, this.db.close()];
                    case 1:
                        _a.sent();
                        this.dbType = MonogoManage.DBType.CLOSE;
                        this.db = null;
                        console.log("断开成功!");
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    MonogoManage.prototype.insertOne = function (table, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.dbType != DBManage_1.default.DBType.OPEN)) return [3 /*break*/, 1];
                        throw new Error("请连接服务器!");
                    case 1:
                        if (!this.db) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.db
                                .db(this.dbName)
                                .collection(table)
                                .insertOne(data)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MonogoManage.prototype.insertMany = function (table, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.dbType != DBManage_1.default.DBType.OPEN)) return [3 /*break*/, 1];
                        throw new Error("请连接服务器!");
                    case 1:
                        if (!this.db) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.db
                                .db(this.dbName)
                                .collection(table)
                                .insertMany(data)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return MonogoManage;
}(DBManage_1.default));
exports.default = MonogoManage;
//# sourceMappingURL=MonogoManage.js.map