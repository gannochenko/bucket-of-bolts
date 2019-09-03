"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStringNotEmpty = function (arg) {
    return typeof arg === 'string' && arg.length > 0;
};
exports.isObject = function (arg) {
    return arg !== null && (typeof arg === 'object' || typeof arg === 'function');
};
exports.isObjectNotEmpty = function (arg) {
    return exports.isObject(arg) && Object.keys(arg).length > 0;
};
exports.isArray = function (arg) { return Array.isArray(arg); };
exports.intersection = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.reduce(function (a, b) { return a.filter(function (c) { return b.includes(c); }); });
};
//# sourceMappingURL=util.js.map