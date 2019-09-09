"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
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
    union: function (arg1, arg2) { return __spread(arg1, arg2); },
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
    unique: function (arg) { return __spread(new Set(arg)); },
};
//# sourceMappingURL=index.js.map