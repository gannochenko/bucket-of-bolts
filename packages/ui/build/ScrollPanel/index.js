"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollPanel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = require("prop-types");

var _style = require("packages/ui/src/ScrollPanel/style");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var getHeight = function getHeight(el) {
  return el.getBoundingClientRect().height;
};

var ScrollPanel = function ScrollPanel(_ref) {
  var children = _ref.children,
      theme = _ref.theme;
  var inner = (0, _react.useRef)();
  var outer = (0, _react.useRef)();
  return _react.default.createElement(_style.ScrollPanelContainer, {
    theme: theme,
    ref: outer,
    onWheel: function onWheel(e) {
      var outerNode = outer.current;
      var innerNode = inner.current;
      var bH = getHeight(innerNode);

      if (bH === 0) {
        console.error('ScrollPane: inner node has zero height.'); // eslint-disable-line no-console
      }

      var oH = getHeight(outerNode);

      if (bH <= oH) {
        return;
      } // blocking scroll up


      if (e.deltaY < 0 && outerNode.scrollTop <= 0) {
        e.preventDefault();
        return;
      } // blocking scroll down


      if (e.deltaY > 0) {
        if (outerNode.scrollTop + getHeight(outerNode) >= bH) {
          e.preventDefault();
        }
      }
    }
  }, _react.default.createElement(_style.Inner, {
    theme: theme,
    ref: inner
  }, children()));
};

exports.ScrollPanel = ScrollPanel;
ScrollPanel.propTypes = {
  theme: _propTypes.object,
  children: _propTypes.func
};
ScrollPanel.defaultProps = {
  theme: _style.defaultTheme,
  children: function children() {}
};