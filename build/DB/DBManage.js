"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongoDB = require("mongodb");
var MongoClient = MongoDB.MongoClient;
var DBManage = /** @class */ (function () {
    function DBManage() {
        this.dbType = DBManage.DBType.NONE;
        this.dbHost = "";
        this.dbPort = "";
        this.dbName = "";
        this.dbUser = "";
        this.dbPasswd = "";
        this.dbSrc = "";
    }
    return DBManage;
}());
(function (DBManage) {
    var DBType;
    (function (DBType) {
        DBType[DBType["NONE"] = 0] = "NONE";
        DBType[DBType["CLOSE"] = 1] = "CLOSE";
        DBType[DBType["OPEN"] = 2] = "OPEN";
        DBType[DBType["ERROR"] = 3] = "ERROR";
    })(DBType = DBManage.DBType || (DBManage.DBType = {}));
})(DBManage || (DBManage = {}));
exports.default = DBManage;
//# sourceMappingURL=DBManage.js.map