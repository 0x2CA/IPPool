"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var superagent = require("superagent");
require("superagent-proxy")(superagent);
var RequestStatic = /** @class */ (function () {
    function RequestStatic() {
    }
    RequestStatic.get = function (url, proxy, timeout) {
        return new Promise(function (resolve, reject) {
            var request = superagent.get(url);
            if (proxy) {
                request = request.proxy(proxy);
            }
            if (timeout) {
                request = request.timeout(timeout);
            }
            request.end(function (err, res) {
                if (!err) {
                    resolve(res.text);
                }
                else {
                    reject(err);
                }
            });
        });
    };
    return RequestStatic;
}());
exports.default = RequestStatic;
//# sourceMappingURL=RequestStatic.js.map