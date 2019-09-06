"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var toHalf = function (x) { return x / 2; };
var negate = function (x) { return x * -1; };
var checkTheme = function (theme) {
    theme = theme || {};
    theme.resolution = theme.resolution || 12;
    theme.breakpoints = theme.breakpoints || {
        xs: [null, 767],
        sm: [768, 991],
        md: [992, 1199],
        lg: [1200, null],
    };
    var bpMedia = {};
    Object.keys(theme.breakpoints).forEach(function (bp) {
        var item = theme.breakpoints[bp];
        var range = [];
        if (item[0]) {
            range.push("(min-width: " + item[0] + "px)");
        }
        if (item[1]) {
            range.push("(max-width: " + item[1] + "px)");
        }
        bpMedia[bp] = range.join(' and ');
    });
    theme.media = bpMedia;
    return theme;
};
exports.grid = function (config, theme) {
    if (config === void 0) { config = {}; }
    if (theme === void 0) { theme = {}; }
    theme = Object.assign({}, checkTheme(theme), config);
    var cssSelf = '';
    var cssChildren = '';
    var guttersH = (theme.guttersH ||
        theme.guttersY ||
        theme.gutters);
    var guttersW = (theme.guttersW ||
        theme.guttersX ||
        theme.gutters);
    if (guttersH || guttersW) {
        if (guttersW && 'all' in guttersW) {
            var gutter = guttersW.all;
            var gutterHalf = util_1.op(gutter, toHalf);
            var gutterHalfNeg = util_1.op(gutterHalf, negate);
            cssSelf += "\n                margin-left: " + gutterHalfNeg + ";\n                margin-right: " + gutterHalfNeg + ";\n            ";
            cssChildren += "\n                padding-left: " + gutterHalf + ";\n                padding-right: " + gutterHalf + ";\n            ";
        }
        if (guttersH && 'all' in guttersH) {
            var gutter = guttersH.all;
            var gutterNeg = util_1.op(gutter, negate);
            cssSelf += "\n                margin-bottom: " + gutterNeg + ";\n            ";
            cssChildren += "\n                padding-bottom: " + gutter + ";\n            ";
        }
        Object.keys(theme.breakpoints).forEach(function (bp) {
            var media = theme.media[bp];
            if (guttersW) {
                if (bp in guttersW) {
                    var gutter = guttersW[bp];
                    var gutterHalf = util_1.op(gutter, toHalf);
                    var gutterHalfNeg = util_1.op(gutterHalf, negate);
                    cssSelf += "\n                        @media screen and " + media + " {\n                            margin-left: " + gutterHalfNeg + ";\n                            margin-right: " + gutterHalfNeg + ";\n                        };\n                    ";
                    cssChildren += "\n                        @media screen and " + media + " {\n                            padding-left: " + gutterHalf + ";\n                            padding-right: " + gutterHalf + ";\n                        }\n                    ";
                }
            }
            if (guttersH) {
                if (bp in guttersH) {
                    var gutter = guttersH[bp];
                    var gutterNeg = util_1.op(gutter, negate);
                    cssSelf += "\n                        @media screen and " + media + " {\n                            margin-bottom: " + gutterNeg + ";\n                        }\n                    ";
                    cssChildren += "\n                        @media screen and " + media + " {\n                            padding-bottom: " + gutter + ";\n                        }\n                    ";
                }
            }
        });
    }
    return "\n        display: flex;\n        flex-wrap: wrap;\n        flex-direction: row;\n        " + cssSelf + "\n        & > * {\n            " + cssChildren + "\n        }\n    ";
};
var makeConstraintMix = function (width) {
    return "\n        flex-basis: " + width + ";\n        width: " + width + ";\n    ";
};
var calcWidth = function (width, resolution) {
    return Math.floor((width / resolution) * 1000) * 0.1;
};
exports.cell = function (config, theme) {
    if (config === void 0) { config = {}; }
    if (theme === void 0) { theme = {}; }
    theme = Object.assign({}, checkTheme(theme), config);
    var result = '';
    var resolution = theme.resolution;
    Object.keys(theme.breakpoints).forEach(function (bp) {
        var media = theme.media[bp];
        var width = '';
        if (bp in theme) {
            width = makeConstraintMix(calcWidth(theme[bp], resolution) + "%");
        }
        else {
            width = makeConstraintMix('all' in theme
                ? calcWidth(theme.all, resolution) + "%"
                : 'auto');
        }
        result += "\n            @media screen and " + media + " { " + width + " }\n        ";
    });
    return result;
};
exports.media = function (rules, theme) {
    if (rules === void 0) { rules = {}; }
    if (theme === void 0) { theme = {}; }
    theme = checkTheme(theme);
    var result = '';
    if ('all' in rules) {
        result += rules.all;
    }
    Object.keys(theme.breakpoints).forEach(function (bp) {
        var mediaInfo = theme.media[bp];
        if (bp in rules) {
            result += "\n                @media screen and " + mediaInfo + " {\n                    " + rules[bp] + "\n                }\n            ";
        }
    });
    return result;
};
//# sourceMappingURL=grid.js.map