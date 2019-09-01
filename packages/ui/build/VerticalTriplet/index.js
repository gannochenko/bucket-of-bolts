"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VerticalTriplet = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = require("prop-types");

var _style = require("style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VerticalTriplet = function VerticalTriplet(_ref) {
  var top = _ref.top,
      bottom = _ref.bottom,
      children = _ref.children;
  return _react.default.createElement(_style.VerticalTripletContainer, null, !!top && _react.default.createElement(_style.Top, null, top), _react.default.createElement(_style.Middle, null, children), !!bottom && _react.default.createElement(_style.Bottom, null, bottom));
};

exports.VerticalTriplet = VerticalTriplet;
VerticalTriplet.propTypes = {
  theme: _propTypes.object,
  top: _propTypes.object,
  bottom: _propTypes.object,
  children: _propTypes.object
};
VerticalTriplet.defaultProps = {
  theme: _style.defaultTheme,
  top: null,
  bottom: null,
  children: _propTypes.object
};