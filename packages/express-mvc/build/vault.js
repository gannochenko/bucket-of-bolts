"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vault = new Map();
exports.getVaultFor = function (key) {
    if (!vault.has(key)) {
        vault.set(key, {});
    }
    return vault.get(key);
};
exports.hasVaultFor = function (obj) { return vault.has(obj); };
exports.getVault = function () { return vault; };
//# sourceMappingURL=vault.js.map