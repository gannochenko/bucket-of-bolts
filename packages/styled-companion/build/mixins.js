"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var trans = function (what, duration) {
    if (duration <= 0) {
        return '';
    }
    return "transition: " + what + " " + duration + " ease";
};
exports.fontMaterialIcons = function () { return "\n    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');\n"; };
var j = function (how) {
    if (how === 'start' || how === 'left' || how === 'top') {
        return 'flex-start';
    }
    if (how === 'end' || how === 'right' || how === 'bottom') {
        return 'flex-end';
    }
    if (how === 'middle') {
        return 'center';
    }
    return how;
};
exports.align = function (y, x, direction) {
    if (y === void 0) { y = null; }
    if (x === void 0) { x = null; }
    if (direction === void 0) { direction = 'row'; }
    x = j(x);
    y = j(y);
    if (direction === 'column' || direction === 'col') {
        return "\n            display: flex;\n            flex-direction: column;\n            " + (y !== null ? "justify-content: " + y : '') + "\n            " + (x !== null ? "align-items: " + x : '') + "\n        ";
    }
    return "\n        display: flex;\n        flex-direction: row;\n        " + (x !== null ? "justify-content: " + x : '') + "\n        " + (y !== null ? "align-items: " + y : '') + "\n    ";
};
exports.round = function () { return "\n    border-radius: 99999rem;\n"; };
exports.rectangle = function (height, width, k) {
    if (height === void 0) { height = null; }
    if (width === void 0) { width = null; }
    if (k === void 0) { k = null; }
    if (height === null) {
        height = width;
    }
    else if (width === null) {
        width = height;
    }
    if (k !== null) {
        width = util_1.op(width, function (v) { return v * k; });
        height = util_1.op(height, function (v) { return v * k; });
    }
    return "\n        " + (width !== null ? "width: " + width + ";" : '') + "\n        " + (height !== null ? "height: " + height + ";" : '') + "\n    ";
};
exports.group = function (hOffs, wOffs) {
    if (hOffs === void 0) { hOffs = null; }
    if (wOffs === void 0) { wOffs = null; }
    return "\n        & > * {\n            " + (hOffs !== null ? "margin-bottom: " + hOffs : '') + ";\n            " + (wOffs !== null ? "margin-right: " + wOffs : '') + "\n        }\n    \n        " + (hOffs !== null ? "margin-bottom: " + util_1.op(hOffs, function (v) { return -1 * v; }) : '') + "\n        " + (wOffs !== null ? "margin-right: " + util_1.op(wOffs, function (v) { return -1 * v; }) : '') + "\n    ";
};
exports.central = function (maxWidth) {
    if (maxWidth === void 0) { maxWidth = '960px'; }
    return "\n    margin-left: auto;\n    margin-right: auto;\n    max-width: " + maxWidth + ";\n";
};
exports.centralColumn = function (maxWidth, gutter) {
    if (maxWidth === void 0) { maxWidth = '960px'; }
    if (gutter === void 0) { gutter = '1rem'; }
    return "\n    " + exports.central(maxWidth) + "\n    min-width: 320px;\n    height: 100vh;\n    " + (gutter ? "padding-left: " + gutter + "; padding-right: " + gutter : '') + "\n    box-sizing: border-box;\n";
};
exports.disabled = function (opacity) {
    if (opacity === void 0) { opacity = null; }
    return "\n    cursor: not-allowed;\n    pointer-events: none;\n    user-select: none;\n    " + (opacity !== null ? "opacity: " + opacity + ";" : '') + "\n    \n    & * {\n        user-select: none;\n    }\n";
};
exports.mirror = function () { return "\n    -moz-transform: scaleX(-1);\n    -o-transform: scaleX(-1);\n    -webkit-transform: scaleX(-1);\n    transform: scaleX(-1);\n    filter: FlipH;\n    -ms-filter: \"FlipH\";\n"; };
exports.fontReset = function () { return "\n    font-style: normal;\n    letter-spacing: normal;\n    direction: ltr;\n    -webkit-font-feature-settings: 'liga';\n    -webkit-font-smoothing: antialiased;\n"; };
exports.icon = function (code, size, offset) {
    if (code === void 0) { code = 'help'; }
    if (size === void 0) { size = 'inherit'; }
    if (offset === void 0) { offset = 0; }
    return "\n    height: " + size + ";\n    width: " + size + ";\n    font-size: " + size + ";\n    line-height: 100%;\n    box-sizing: content-box;\n\n    padding: " + offset + ";\n    ::before {\n        content: '" + code + "';\n        height: " + size + ";\n        width: " + size + ";\n        display: block;\n        text-transform: none;\n        line-height: 100%;\n    }\n\n    font-family: Material Icons, sans-serif;\n";
};
exports.iconLabel = function (code, size, iconVAlignment, iconHAlignment, iconWidth, distance) {
    if (code === void 0) { code = 'help'; }
    if (size === void 0) { size = 'inherit'; }
    if (iconVAlignment === void 0) { iconVAlignment = 'baseline'; }
    if (iconHAlignment === void 0) { iconHAlignment = 0; }
    if (iconWidth === void 0) { iconWidth = 'auto'; }
    if (distance === void 0) { distance = 0; }
    return "\n    display: flex;        \n    " + (iconVAlignment === 'baseline' ? 'align-items: baseline' : '') + " \n    \n    ::before {\n        content: '" + code + "';\n        flex-shrink: 0;\n        padding-right: " + distance + ";\n        font-family: Material Icons, sans-serif;\n        " + exports.fontReset() + "\n        text-transform: none;\n        font-size: " + size + ";\n        text-align: center;\n        width: " + iconWidth + ";\n        line-height: 100%;\n    \n        " + (iconVAlignment !== 'baseline' ? "margin-top: " + iconVAlignment : '') + "\n        " + (iconHAlignment !== 'baseline'
        ? "margin-bottom: " + iconHAlignment
        : '') + "\n    }\n";
};
exports.ellipsis = function () { return "\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    overflow-x: hidden;\n"; };
exports.backgroundCover = function (image) {
    if (image === void 0) { image = null; }
    return "\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-attachment: scroll;\n    \n    " + (image ? "background-image: url(" + image + ");" : '') + "\n";
};
exports.helvetica = function () { return "\n    font-family: Helvetica, sans-serif;\n"; };
exports.fgColor = function (color, hoverColor, transitionTime) {
    if (color === void 0) { color = 'inherit'; }
    if (hoverColor === void 0) { hoverColor = null; }
    if (transitionTime === void 0) { transitionTime = 0; }
    return "\n    color: " + color + ";\n    " + (color !== hoverColor && "&:hover { color: " + hoverColor + " }") + "\n    " + trans('color', transitionTime) + "\n";
};
exports.bgColor = function (color, hoverColor, focusColor, transitionTime) {
    if (color === void 0) { color = 'inherit'; }
    if (hoverColor === void 0) { hoverColor = null; }
    if (focusColor === void 0) { focusColor = null; }
    if (transitionTime === void 0) { transitionTime = 0; }
    return "\n    background-color: " + color + ";\n    &:hover {\n      background-color: " + (hoverColor || color) + ";\n    }\n    &:focus {\n      background-color: " + (focusColor || color) + ";\n    }\n    \n    " + trans('background-color', transitionTime) + "\n";
};
exports.underline = function (mode, thickness, color, transitionTime) {
    if (mode === void 0) { mode = 'on-hover'; }
    if (thickness === void 0) { thickness = '1px'; }
    if (color === void 0) { color = 'currentcolor'; }
    if (transitionTime === void 0) { transitionTime = 0; }
    return "\n    " + (mode === 'on-hover'
        ? "\n          border: 0 none;\n          border-bottom: " + thickness + " dashed transparent;\n          &:hover {\n            border-bottom: " + thickness + " dashed " + color + ";\n          }\n        "
        : '') + "\n\n    " + trans('border-color', transitionTime) + "\n";
};
exports.textDecoration = function (mode, decoration) {
    if (mode === void 0) { mode = 'on-hover'; }
    if (decoration === void 0) { decoration = 'underline'; }
    return "\n    " + (mode === 'on-hover'
        ? "\n            text-decoration: none;\n            &:hover {\n                text-decoration: " + decoration + ";\n            };\n        "
        : '') + "\n    " + (mode === 'on-hout'
        ? "\n            text-decoration: " + decoration + ";\n            &:hover {\n                text-decoration: none;\n            }\n        "
        : '') + "\n";
};
exports.heightTrick = function () { return "\n    position: relative;\n    width: 100%;\n  \n    &:before {\n      content: \"\";\n      display: block;\n      padding-top: 100%;\n    }\n\n    > * {\n      position: absolute;\n      top: 0;\n      left: 0;\n      bottom: 0;\n      right: 0;\n    }\n"; };
exports.fixedCover = function () { return "\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n"; };
exports.absoluteCover = function () { return "\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n"; };
exports.borderColor = function (hout, hover) { return "\n\t" + (hout ? "border-color: " + hout + ";" : '') + "\n\t" + (hover
    ? "&:hover { border-color: " + hover + "; transition: border-color 200ms ease;}"
    : '') + "\n"; };
exports.normalizeCellWidth = function () { return "\n    min-width: 100px;\n    flex-grow: 1;\n"; };
//# sourceMappingURL=mixins.js.map