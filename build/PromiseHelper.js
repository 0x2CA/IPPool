"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PromiseHelper = /** @class */ (function () {
    function PromiseHelper() {
    }
    PromiseHelper.awaitWhere = function (fun, timeOut) {
        if (timeOut === void 0) { timeOut = 3 * 60 * 1000; }
        return new Promise(function (resolve, reject) {
            var time = -200;
            var whereCheck = function () {
                time += 200;
                if (time >= timeOut) {
                    reject("等待超时");
                }
                if (fun()) {
                    resolve();
                }
                else {
                    setTimeout(whereCheck, 200);
                }
            };
            whereCheck();
        });
    };
    return PromiseHelper;
}());
exports.default = PromiseHelper;
//# sourceMappingURL=PromiseHelper.js.map