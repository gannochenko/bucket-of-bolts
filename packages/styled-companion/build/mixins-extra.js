"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mixins_1 = require("./mixins");
exports.stdLink = function (style) {
    style = style || {};
    style.color = style.color || {};
    var _a = style.color, hover = _a.hover, hout = _a.hout;
    return "\n\t    text-decoration: none;\n\t    " + mixins_1.fgColor(hover, hout, '200ms') + "\n\t    cursor: pointer;\n\t";
};
exports.stdInput = function (style, hasError, hasFocus) {
    if (hasError === void 0) { hasError = false; }
    if (hasFocus === void 0) { hasFocus = null; }
    style = style || {};
    style.color = style.color || {};
    style.padding = '0.5rem';
    var _a = style.color, hover = _a.hover, hout = _a.hout, error = _a.error;
    return "\n        padding: " + style.padding + ";\n        background-color: white;\n        " + (!hasError && hout ? "border: 1px solid " + hout + ";" : '') + "\n        " + (hasError && error ? "border: 1px solid " + error + ";" : '') + "\n        " + (hasFocus === null
        ? hover
            ? "&:hover, &:focus, &:active {border-color: " + hover + ";}; transition: border-color 200ms ease;"
            : ''
        : '') + "\n        " + (hasFocus !== null
        ? hover
            ? "\n                        &:hover {border-color: " + hover + ";}; transition: border-color 200ms ease;\n                        " + (hasFocus ? "border-color: " + hover + ";" : '') + "\n                    "
            : ''
        : '') + "\n    \n        border-radius: 2px;\n    ";
};
//# sourceMappingURL=mixins-extra.js.map