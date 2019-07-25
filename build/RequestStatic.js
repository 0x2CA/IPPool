"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var superagent = require("superagent");
var RequestStatic = /** @class */ (function () {
    function RequestStatic() {
    }
    RequestStatic.get = function (url) {
        return new Promise(function (resolve, reject) {
            superagent.get(url).end(function (err, res) {
                if (!err) {
                    resolve(res);
                }
                else {
                    console.error(err);
                    reject(err);
                }
            });
        });
    };
    return RequestStatic;
}());
exports.default = RequestStatic;
//# sourceMappingURL=RequestStatic.js.map