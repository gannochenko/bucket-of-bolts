"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isObject = (arg) => arg !== null && (typeof arg === 'object' || typeof arg === 'function');
exports.default = {
    isArray: Array.isArray,
    isObject,
    isFunction: (arg) => typeof arg === 'function',
    isArrayNotEmpty: (arg) => Array.isArray(arg) && arg.length > 0,
    isObjectNotEmpty: (arg) => isObject(arg) && Object.keys(arg).length > 0,
    isStringNotEmpty: (arg) => typeof arg === 'string' && arg.length > 0,
    union: (arg1, arg2) => [...arg1, ...arg2],
    intersection: (...args) => args.reduce((a, b) => a.filter(c => b.includes(c))),
    difference: (...args) => args.reduce((a, b) => a.filter(c => !b.includes(c))),
    unique: (arg) => [...new Set(arg)],
};
//# sourceMappingURL=index.js.map