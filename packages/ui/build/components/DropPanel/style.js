'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.PanelInner = exports.Panel = exports.DropPanelContainer = exports.defaultTheme = void 0;

var _styledComponents = _interopRequireDefault(require('styled-components'));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var defaultTheme = {
    zIndex: null,
    panelVOffset: '0',
};
exports.defaultTheme = defaultTheme;

var DropPanelContainer = _styledComponents.default.div.withConfig({
    displayName: 'style__DropPanelContainer',
    componentId: 'm0bu3g-0',
})(['position:relative;']);

exports.DropPanelContainer = DropPanelContainer;

var Panel = _styledComponents.default.div.withConfig({
    displayName: 'style__Panel',
    componentId: 'm0bu3g-1',
})(
    ['position:absolute;left:0;top:100%;', ' ', ' margin-bottom:1rem;'],
    function(props) {
        return props.theme.zIndex !== null
            ? 'z-index: '.concat(props.theme.zIndex, ';')
            : '';
    },
    function(props) {
        return props.open ? '' : 'display: none;';
    },
);

exports.Panel = Panel;

var PanelInner = _styledComponents.default.div.withConfig({
    displayName: 'style__PanelInner',
    componentId: 'm0bu3g-2',
})(['margin-top:', ';'], function(props) {
    return props.theme.panelVOffset ? props.theme.panelVOffset : '';
});

exports.PanelInner = PanelInner;
