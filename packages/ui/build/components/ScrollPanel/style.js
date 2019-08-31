'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.Inner = exports.ScrollPanelContainer = exports.defaultTheme = void 0;

var _styledComponents = _interopRequireDefault(require('styled-components'));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var defaultTheme = {};
exports.defaultTheme = defaultTheme;

var ScrollPanelContainer = _styledComponents.default.div.withConfig({
    displayName: 'style__ScrollPanelContainer',
    componentId: 'sc-19tinty-0',
})(['']);

exports.ScrollPanelContainer = ScrollPanelContainer;

var Inner = _styledComponents.default.div.withConfig({
    displayName: 'style__Inner',
    componentId: 'sc-19tinty-1',
})(['']);

exports.Inner = Inner;
