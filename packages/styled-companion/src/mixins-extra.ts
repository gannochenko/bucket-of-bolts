/* eslint-disable no-nested-ternary */
import { fgColor } from './mixins';

interface Style {
    color?: {
        hover?: string;
        hout?: string;
        error?: string;
    };
    padding?: string;
}

export const stdLink = (style: Style) => {
    style = style || {};
    style.color = style.color || {};
    const { hover, hout } = style.color;

    return `
	    text-decoration: none;
	    ${fgColor(hover, hout, '200ms')}
	    cursor: pointer;
	`;
};

export const stdInput = (style: Style, hasError = false, hasFocus = null) => {
    style = style || {};
    style.color = style.color || {};
    style.padding = '0.5rem';
    const { hover, hout, error } = style.color;
    return `
        padding: ${style.padding};
        background-color: white;
        ${!hasError && hout ? `border: 1px solid ${hout};` : ''}
        ${hasError && error ? `border: 1px solid ${error};` : ''}
        ${
            // focus is controlled in the native way
            hasFocus === null
                ? hover
                    ? `&:hover, &:focus, &:active {border-color: ${hover};}; transition: border-color 200ms ease;`
                    : ''
                : ''
        }
        ${
            // focus is controlled explicitly
            hasFocus !== null
                ? hover
                    ? `
                        &:hover {border-color: ${hover};}; transition: border-color 200ms ease;
                        ${hasFocus ? `border-color: ${hover};` : ''}
                    `
                    : ''
                : ''
        }
    
        border-radius: 2px;
    `;
};
