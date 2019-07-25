"use strict";
//https://www.kuaidaili.com/free/inha/页数
//http://www.ip3366.net/free/?stype=1&page=页数
//https://www.xicidaili.com/nn/页数
Object.defineProperty(exports, "__esModule", { value: true });
var Application = /** @class */ (function () {
    function Application() {
    }
    Application.Main = function () {
        var argv = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argv[_i] = arguments[_i];
        }
    };
    return Application;
}());
exports.default = Application;
Application.Main.apply(Application, process.argv.slice(2));
//# sourceMappingURL=Application.js.map