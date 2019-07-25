"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FreePool = /** @class */ (function () {
    function FreePool() {
    }
    FreePool.getPool = function (type) {
        return new type();
    };
    return FreePool;
}());
exports.default = FreePool;
//# sourceMappingURL=FreePool.js.map