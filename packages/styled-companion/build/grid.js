"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const toHalf = (x) => x / 2;
const negate = (x) => x * -1;
const checkTheme = (theme) => {
    theme = theme || {};
    theme.resolution = theme.resolution || 12;
    theme.breakpoints = theme.breakpoints || {
        xs: [null, 767],
        sm: [768, 991],
        md: [992, 1199],
        lg: [1200, null],
    };
    const bpMedia = {};
    Object.keys(theme.breakpoints).forEach((bp) => {
        const item = theme.breakpoints[bp];
        const range = [];
        if (item[0]) {
            range.push(`(min-width: ${item[0]}px)`);
        }
        if (item[1]) {
            range.push(`(max-width: ${item[1]}px)`);
        }
        bpMedia[bp] = range.join(' and ');
    });
    theme.media = bpMedia;
    return theme;
};
exports.grid = (config = {}, theme = {}) => {
    theme = Object.assign({}, checkTheme(theme), config);
    let cssSelf = '';
    let cssChildren = '';
    const guttersH = (theme.guttersH ||
        theme.guttersY ||
        theme.gutters);
    const guttersW = (theme.guttersW ||
        theme.guttersX ||
        theme.gutters);
    if (guttersH || guttersW) {
        if (guttersW && 'all' in guttersW) {
            const gutter = guttersW.all;
            const gutterHalf = util_1.op(gutter, toHalf);
            const gutterHalfNeg = util_1.op(gutterHalf, negate);
            cssSelf += `
                margin-left: ${gutterHalfNeg};
                margin-right: ${gutterHalfNeg};
            `;
            cssChildren += `
                padding-left: ${gutterHalf};
                padding-right: ${gutterHalf};
            `;
        }
        if (guttersH && 'all' in guttersH) {
            const gutter = guttersH.all;
            const gutterNeg = util_1.op(gutter, negate);
            cssSelf += `
                margin-bottom: ${gutterNeg};
            `;
            cssChildren += `
                padding-bottom: ${gutter};
            `;
        }
        Object.keys(theme.breakpoints).forEach(bp => {
            const media = theme.media[bp];
            if (guttersW) {
                if (bp in guttersW) {
                    const gutter = guttersW[bp];
                    const gutterHalf = util_1.op(gutter, toHalf);
                    const gutterHalfNeg = util_1.op(gutterHalf, negate);
                    cssSelf += `
                        @media screen and ${media} {
                            margin-left: ${gutterHalfNeg};
                            margin-right: ${gutterHalfNeg};
                        };
                    `;
                    cssChildren += `
                        @media screen and ${media} {
                            padding-left: ${gutterHalf};
                            padding-right: ${gutterHalf};
                        }
                    `;
                }
            }
            if (guttersH) {
                if (bp in guttersH) {
                    const gutter = guttersH[bp];
                    const gutterNeg = util_1.op(gutter, negate);
                    cssSelf += `
                        @media screen and ${media} {
                            margin-bottom: ${gutterNeg};
                        }
                    `;
                    cssChildren += `
                        @media screen and ${media} {
                            padding-bottom: ${gutter};
                        }
                    `;
                }
            }
        });
    }
    return `
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        ${cssSelf}
        & > * {
            ${cssChildren}
        }
    `;
};
const makeConstraintMix = (width) => {
    return `
        flex-basis: ${width};
        width: ${width};
    `;
};
const calcWidth = (width, resolution) => Math.floor((width / resolution) * 1000) * 0.1;
exports.cell = (config = {}, theme = {}) => {
    theme = Object.assign({}, checkTheme(theme), config);
    let result = '';
    const { resolution } = theme;
    Object.keys(theme.breakpoints).forEach(bp => {
        const media = theme.media[bp];
        let width = '';
        if (bp in theme) {
            width = makeConstraintMix(`${calcWidth(theme[bp], resolution)}%`);
        }
        else {
            width = makeConstraintMix('all' in theme
                ? `${calcWidth(theme.all, resolution)}%`
                : 'auto');
        }
        result += `
            @media screen and ${media} { ${width} }
        `;
    });
    return result;
};
exports.media = (rules = {}, theme = {}) => {
    theme = checkTheme(theme);
    let result = '';
    if ('all' in rules) {
        result += rules.all;
    }
    Object.keys(theme.breakpoints).forEach(bp => {
        const mediaInfo = theme.media[bp];
        if (bp in rules) {
            result += `
                @media screen and ${mediaInfo} {
                    ${rules[bp]}
                }
            `;
        }
    });
    return result;
};
//# sourceMappingURL=grid.js.map