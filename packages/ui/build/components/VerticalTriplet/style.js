"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bottom = exports.Middle = exports.Top = exports.VerticalTripletContainer = exports.defaultTheme = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _scCompanion = require("sc-companion");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultTheme = {};
exports.defaultTheme = defaultTheme;

var VerticalTripletContainer = _styledComponents.default.div.withConfig({
  displayName: "style__VerticalTripletContainer",
  componentId: "sc-558457-0"
})(["", " height:100%;"], (0, _scCompanion.align)('top', 'stretch', 'column'));

exports.VerticalTripletContainer = VerticalTripletContainer;

var Top = _styledComponents.default.div.withConfig({
  displayName: "style__Top",
  componentId: "sc-558457-1"
})(["flex-shrink:0;"]);

exports.Top = Top;

var Middle = _styledComponents.default.div.withConfig({
  displayName: "style__Middle",
  componentId: "sc-558457-2"
})(["", " flex-grow:2;"], (0, _scCompanion.align)('stretch', 'left'));

exports.Middle = Middle;

var Bottom = _styledComponents.default.div.withConfig({
  displayName: "style__Bottom",
  componentId: "sc-558457-3"
})(["flex-shrink:0;"]);

exports.Bottom = Bottom;