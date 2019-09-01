"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropPanel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = require("prop-types");

var _style = require("style");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DropPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(DropPanel, _Component);

  function DropPanel(props) {
    var _this;

    _classCallCheck(this, DropPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DropPanel).call(this, props));

    _this.onDocumentClick = function (e) {
      if (!_this.state.open) {
        return;
      }

      if (_this.preventClose) {
        return;
      }

      var node = e.target;

      while (node) {
        if (node === _this.panel.current) {
          clearTimeout(_this.timer);
          _this.timer = null;
          return;
        }

        node = node.parentNode;
      }

      _this.closeImmediate();
    };

    _this.onDocumentKeyPress = function (e) {
      if (!_this.state.open) {
        return;
      }

      if (e.code === 'Escape') {
        _this.closeImmediate();
      }
    };

    _this.close = function () {
      _this.timer = setTimeout(function () {
        _this.timer = null;

        _this.closeImmediate();
      }, 300);
    };

    _this.toggle = function () {
      _this.setState(function (state) {
        return {
          open: !state.open
        };
      });
    };

    _this.closeImmediate = function () {
      _this.setState({
        open: false
      });

      _this.props.onClose();
    };

    _this.state = {};
    _this.panel = _react.default.createRef();
    _this.preventClose = false;
    return _this;
  }

  _createClass(DropPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.disableEvents) {
        window.addEventListener('click', this.onDocumentClick);
        window.addEventListener('keydown', this.onDocumentKeyPress);
      }

      if (this.props.open) {
        this.open();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!this.props.disableEvents) {
        window.removeEventListener('click', this.onDocumentClick);
        window.removeEventListener('keydown', this.onDocumentKeyPress);
      }
    }
  }, {
    key: "open",
    value: function open(options) {
      var _this2 = this;

      options = options || {};
      var _options = options,
          preventClose = _options.preventClose;

      if (preventClose) {
        this.preventClose = true;
      }

      this.setState({
        open: true
      });

      if (preventClose) {
        setTimeout(function () {
          _this2.preventClose = false;
        }, 100);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          theme = _this$props.theme,
          panel = _this$props.panel,
          openOnChildrenClick = _this$props.openOnChildrenClick;
      return _react.default.createElement(_style.DropPanelContainer, {
        ref: this.panel
      }, !!openOnChildrenClick && _react.default.createElement("div", {
        onClick: this.toggle
      }, children({
        closePanel: this.close
      })), !openOnChildrenClick && children({
        closePanel: this.close
      }), _react.default.createElement(_style.Panel, {
        theme: theme,
        open: this.state.open
      }, _react.default.createElement(_style.PanelInner, {
        theme: theme
      }, panel({
        closePanel: this.close
      }))));
    }
  }]);

  return DropPanel;
}(_react.Component);

exports.DropPanel = DropPanel;
DropPanel.propTypes = {
  theme: _propTypes.object,
  panel: _propTypes.func,
  children: _propTypes.func,
  openOnChildrenClick: _propTypes.bool,
  disableEvents: _propTypes.bool,
  onClose: _propTypes.func,
  open: _propTypes.bool
};
DropPanel.defaultProps = {
  theme: _style.defaultTheme,
  panel: function panel() {},
  children: function children() {},
  openOnChildrenClick: false,
  onClose: function onClose() {},
  disableEvents: false,
  open: false
};