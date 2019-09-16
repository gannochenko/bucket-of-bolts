"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mixins_1 = require("./mixins");
exports.stdLink = (style) => {
    style = style || {};
    style.color = style.color || {};
    const { hover, hout } = style.color;
    return `
	    text-decoration: none;
	    ${mixins_1.fgColor(hover, hout, '200ms')}
	    cursor: pointer;
	`;
};
exports.stdInput = (style, hasError = false, hasFocus = null) => {
    style = style || {};
    style.color = style.color || {};
    style.padding = '0.5rem';
    const { hover, hout, error } = style.color;
    return `
        padding: ${style.padding};
        background-color: white;
        ${!hasError && hout ? `border: 1px solid ${hout};` : ''}
        ${hasError && error ? `border: 1px solid ${error};` : ''}
        ${hasFocus === null
        ? hover
            ? `&:hover, &:focus, &:active {border-color: ${hover};}; transition: border-color 200ms ease;`
            : ''
        : ''}
        ${hasFocus !== null
        ? hover
            ? `
                        &:hover {border-color: ${hover};}; transition: border-color 200ms ease;
                        ${hasFocus ? `border-color: ${hover};` : ''}
                    `
            : ''
        : ''}
    
        border-radius: 2px;
    `;
};
//# sourceMappingURL=mixins-extra.js.map