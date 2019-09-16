"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vault = new Map();
exports.getVaultFor = (key) => {
    if (!vault.has(key)) {
        vault.set(key, {});
    }
    return vault.get(key);
};
exports.hasVaultFor = (obj) => vault.has(obj);
exports.getVault = () => vault;
//# sourceMappingURL=vault.js.map