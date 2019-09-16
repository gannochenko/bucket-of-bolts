"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStringNotEmpty = (arg) => typeof arg === 'string' && arg.length > 0;
exports.isObject = (arg) => arg !== null && (typeof arg === 'object' || typeof arg === 'function');
exports.isObjectNotEmpty = (arg) => exports.isObject(arg) && Object.keys(arg).length > 0;
exports.isArray = (arg) => Array.isArray(arg);
exports.intersection = (...args) => args.reduce((a, b) => a.filter(c => b.includes(c)));
exports.wrapError = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    }
    catch (e) {
        next(e);
    }
};
//# sourceMappingURL=util.js.map