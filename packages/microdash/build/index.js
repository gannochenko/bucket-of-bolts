"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var isObject = function (arg) {
    return arg !== null && (typeof arg === 'object' || typeof arg === 'function');
};
exports.default = {
    isArray: Array.isArray,
    isObject: isObject,
    isFunction: function (arg) { return typeof arg === 'function'; },
    isArrayNotEmpty: function (arg) { return Array.isArray(arg) && arg.length > 0; },
    isObjectNotEmpty: function (arg) {
        return isObject(arg) && Object.keys(arg).length > 0;
    },
    isStringNotEmpty: function (arg) {
        return typeof arg === 'string' && arg.length > 0;
    },
    union: function (arg1, arg2) { return __spreadArrays(arg1, arg2); },
    intersection: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args.reduce(function (a, b) { return a.filter(function (c) { return b.includes(c); }); });
    },
    difference: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args.reduce(function (a, b) { return a.filter(function (c) { return !b.includes(c); }); });
    },
};
//# sourceMappingURL=index.js.map