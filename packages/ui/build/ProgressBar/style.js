"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Progress = exports.ProgressBarContainer = exports.defaultTheme = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultTheme = {
  bar: {
    color: '#966e1e'
  },
  color: 'transparent'
};
exports.defaultTheme = defaultTheme;

var ProgressBarContainer = _styledComponents.default.div.withConfig({
  displayName: "style__ProgressBarContainer",
  componentId: "sc-2t8tc0-0"
})(["position:fixed;top:0;left:0;right:0;background-color:", ";"], function (props) {
  return props.theme.color;
});

exports.ProgressBarContainer = ProgressBarContainer;

var Progress = _styledComponents.default.div.withConfig({
  displayName: "style__Progress",
  componentId: "sc-2t8tc0-1"
})(["width:", "%;height:", ";background-color:", ";transition:width 300ms ease,height 700ms ease;"], function (props) {
  return props.width || '0';
}, function (props) {
  return !props.fading ? '0.3rem' : '0';
}, function (props) {
  return props.theme.bar.color;
});

exports.Progress = Progress;