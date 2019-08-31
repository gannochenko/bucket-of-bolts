"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Notification = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = require("prop-types");

var _style = require("packages/ui/src/Notification/style");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isne = function isne(str) {
  return typeof str === 'string' && str.length > 0;
};

var ione = function ione(arg) {
  return arg !== null && (_typeof(arg) === 'object' || typeof arg === 'function') && Object.keys(arg).length > 0;
};

var Notification =
/*#__PURE__*/
function (_Component) {
  _inherits(Notification, _Component);

  function Notification(props) {
    var _this;

    _classCallCheck(this, Notification);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Notification).call(this, props));
    _this.messageHeights = {};
    _this.messages = [];
    return _this;
  }

  _createClass(Notification, [{
    key: "notify",
    value: function notify(message) {
      var _this2 = this;

      if (isne(message)) {
        message = {
          text: message,
          type: 'info'
        };
      }

      if (!ione(message) || !isne(message.text)) {
        return;
      }

      if (isne(message.code)) {
        this.closeMessagesByCode(message.code);
      }

      var id = Math.floor(Math.random() * 1000000);
      message = {
        id: id,
        text: message.text,
        type: message.type || '',
        icon: message.icon || '',
        closeable: message.closeable !== false,
        closing: false,
        code: message.code,
        lifeTime: message.lifeTime || 0
      };

      if (message.lifeTime > 0) {
        setTimeout(function () {
          _this2.closeMessage(id);
        }, message.lifeTime);
      }

      this.messages.push(message);
      this.forceUpdate();
    }
  }, {
    key: "closeMessage",
    value: function closeMessage(id) {
      var _this3 = this;

      var message = this.messages.find(function (item) {
        return item.id === id;
      });

      if (message) {
        var heightNode = this.messageHeights[id];

        if (heightNode) {
          // lock the height of the element to let the animation know it
          heightNode.style.height = "".concat(heightNode.offsetHeight, "px");
        }

        setTimeout(function () {
          _this3.removeMessage(id);
        }, 500);
        message.closing = true;
        this.forceUpdate();
      }
    }
  }, {
    key: "closeMessagesByCode",
    value: function closeMessagesByCode(code) {
      var _this4 = this;

      this.messages.filter(function (message) {
        return message.code === code;
      }).forEach(function (message) {
        _this4.closeMessage(message.id);
      });
    }
  }, {
    key: "removeMessage",
    value: function removeMessage(id) {
      this.messages = this.messages.filter(function (message) {
        return message.id !== id;
      });
      delete this.messageHeights[id];
      this.forceUpdate();
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var theme = this.props.theme;
      return _react.default.createElement(_style.NotificationContainer, {
        theme: theme
      }, this.messages.map(function (message) {
        return _react.default.createElement(_style.MessageWrap, {
          key: message.id,
          ref: function ref(_ref) {
            _this5.messageHeights[message.id] = _ref;
          },
          closing: message.closing,
          theme: theme
        }, _react.default.createElement(_style.MessageGap, {
          theme: theme
        }, _react.default.createElement(_style.Message, {
          theme: theme
        }, _react.default.createElement(_style.Text, {
          type: message.type,
          icon: message.icon,
          theme: theme
        }, message.text), message.closeable && _react.default.createElement(_style.Close, {
          onClick: function onClick() {
            return _this5.closeMessage(message.id);
          },
          theme: theme
        }))));
      }));
    }
  }]);

  return Notification;
}(_react.Component);

exports.Notification = Notification;
Notification.propTypes = {
  theme: _propTypes.object
};
Notification.defaultProps = {
  theme: _style.defaultTheme
};