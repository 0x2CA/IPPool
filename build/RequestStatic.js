"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var superagent = require("superagent");
require("superagent-proxy")(superagent);
require("superagent-charset")(superagent);
var RequestStatic = /** @class */ (function () {
    function RequestStatic() {
    }
    RequestStatic.get = function (url, charset, proxy, timeout) {
        if (charset === void 0) { charset = "utf8"; }
        return new Promise(function (resolve, reject) {
            var request = superagent.get(url);
            request = request.charset(charset);
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
                    console.error(url, proxy, timeout, err);
                    reject(err);
                }
            });
        });
    };
    return RequestStatic;
}());
exports.default = RequestStatic;
//# sourceMappingURL=RequestStatic.js.map