"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const trans = (what, duration) => {
    if (duration <= 0) {
        return '';
    }
    return `transition: ${what} ${duration} ease`;
};
exports.fontMaterialIcons = () => `
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
`;
const j = (how) => {
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
exports.align = (y = null, x = null, direction = 'row') => {
    x = j(x);
    y = j(y);
    if (direction === 'column' || direction === 'col') {
        return `
            display: flex;
            flex-direction: column;
            ${y !== null ? `justify-content: ${y}` : ''}
            ${x !== null ? `align-items: ${x}` : ''}
        `;
    }
    return `
        display: flex;
        flex-direction: row;
        ${x !== null ? `justify-content: ${x}` : ''}
        ${y !== null ? `align-items: ${y}` : ''}
    `;
};
exports.round = () => `
    border-radius: 99999rem;
`;
exports.rectangle = (height = null, width = null, k = null) => {
    if (height === null) {
        height = width;
    }
    else if (width === null) {
        width = height;
    }
    if (k !== null) {
        width = util_1.op(width, (v) => v * k);
        height = util_1.op(height, (v) => v * k);
    }
    return `
        ${width !== null ? `width: ${width};` : ''}
        ${height !== null ? `height: ${height};` : ''}
    `;
};
exports.group = (hOffs = null, wOffs = null) => {
    return `
        & > * {
            ${hOffs !== null ? `margin-bottom: ${hOffs}` : ''};
            ${wOffs !== null ? `margin-right: ${wOffs}` : ''}
        }
    
        ${hOffs !== null ? `margin-bottom: ${util_1.op(hOffs, v => -1 * v)}` : ''}
        ${wOffs !== null ? `margin-right: ${util_1.op(wOffs, v => -1 * v)}` : ''}
    `;
};
exports.central = (maxWidth = '960px') => `
    margin-left: auto;
    margin-right: auto;
    max-width: ${maxWidth};
`;
exports.centralColumn = (maxWidth = '960px', gutter = '1rem') => `
    ${exports.central(maxWidth)}
    min-width: 320px;
    height: 100vh;
    ${gutter ? `padding-left: ${gutter}; padding-right: ${gutter}` : ''}
    box-sizing: border-box;
`;
exports.disabled = (opacity = null) => `
    cursor: not-allowed;
    pointer-events: none;
    user-select: none;
    ${opacity !== null ? `opacity: ${opacity};` : ''}
    
    & * {
        user-select: none;
    }
`;
exports.mirror = () => `
    -moz-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    filter: FlipH;
    -ms-filter: "FlipH";
`;
exports.fontReset = () => `
    font-style: normal;
    letter-spacing: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
`;
exports.icon = (code = 'help', size = 'inherit', offset = 0) => `
    height: ${size};
    width: ${size};
    font-size: ${size};
    line-height: 100%;
    box-sizing: content-box;

    padding: ${offset};
    ::before {
        content: '${code}';
        height: ${size};
        width: ${size};
        display: block;
        text-transform: none;
        line-height: 100%;
    }

    font-family: Material Icons, sans-serif;
`;
exports.iconLabel = (code = 'help', size = 'inherit', iconVAlignment = 'baseline', iconHAlignment = 0, iconWidth = 'auto', distance = 0) => `
    display: flex;        
    ${iconVAlignment === 'baseline' ? 'align-items: baseline' : ''} 
    
    ::before {
        content: '${code}';
        flex-shrink: 0;
        padding-right: ${distance};
        font-family: Material Icons, sans-serif;
        ${exports.fontReset()}
        text-transform: none;
        font-size: ${size};
        text-align: center;
        width: ${iconWidth};
        line-height: 100%;
    
        ${iconVAlignment !== 'baseline' ? `margin-top: ${iconVAlignment}` : ''}
        ${iconHAlignment !== 'baseline'
    ? `margin-bottom: ${iconHAlignment}`
    : ''}
    }
`;
exports.ellipsis = () => `
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-x: hidden;
`;
exports.backgroundCover = (image = null) => `
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: scroll;
    
    ${image ? `background-image: url(${image});` : ''}
`;
exports.helvetica = () => `
    font-family: Helvetica, sans-serif;
`;
exports.fgColor = (color = 'inherit', hoverColor = null, transitionTime = 0) => `
    color: ${color};
    ${color !== hoverColor && `&:hover { color: ${hoverColor} }`}
    ${trans('color', transitionTime)}
`;
exports.bgColor = (color = 'inherit', hoverColor = null, focusColor = null, transitionTime = 0) => `
    background-color: ${color};
    &:hover {
      background-color: ${hoverColor || color};
    }
    &:focus {
      background-color: ${focusColor || color};
    }
    
    ${trans('background-color', transitionTime)}
`;
exports.underline = (mode = 'on-hover', thickness = '1px', color = 'currentcolor', transitionTime = 0) => `
    ${mode === 'on-hover'
    ? `
          border: 0 none;
          border-bottom: ${thickness} dashed transparent;
          &:hover {
            border-bottom: ${thickness} dashed ${color};
          }
        `
    : ''}

    ${trans('border-color', transitionTime)}
`;
exports.textDecoration = (mode = 'on-hover', decoration = 'underline') => `
    ${mode === 'on-hover'
    ? `
            text-decoration: none;
            &:hover {
                text-decoration: ${decoration};
            };
        `
    : ''}
    ${mode === 'on-hout'
    ? `
            text-decoration: ${decoration};
            &:hover {
                text-decoration: none;
            }
        `
    : ''}
`;
exports.heightTrick = () => `
    position: relative;
    width: 100%;
  
    &:before {
      content: "";
      display: block;
      padding-top: 100%;
    }

    > * {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
`;
exports.fixedCover = () => `
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;
exports.absoluteCover = () => `
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;
exports.borderColor = (hout, hover) => `
	${hout ? `border-color: ${hout};` : ''}
	${hover
    ? `&:hover { border-color: ${hover}; transition: border-color 200ms ease;}`
    : ''}
`;
exports.normalizeCellWidth = () => `
    min-width: 100px;
    flex-grow: 1;
`;
//# sourceMappingURL=mixins.js.map