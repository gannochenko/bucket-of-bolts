"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pInt = function (val) {
    var iVal = 0;
    if (typeof val === 'string') {
        iVal = parseInt(val, 10);
        if (Number.isNaN(iVal)) {
            iVal = 0;
        }
    }
    else if (typeof val !== 'undefined' && val !== null) {
        iVal = val;
    }
    return iVal;
};
exports.op = function (val, fn) {
    if (typeof val === 'undefined' || val === null) {
        return val;
    }
    var results = val
        .toString()
        .trim()
        .match(/^(\d+)?(.(\d+))?(px|rem|em)?$/i);
    if (results && results.length) {
        var full = exports.pInt(results[1]);
        var frac = exports.pInt(results[3]);
        var unit = results[4] || '';
        return "" + fn(full + +("0." + frac)) + unit;
    }
    return val.toString();
};
//# sourceMappingURL=util.js.map