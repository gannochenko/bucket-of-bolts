"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withNotification = exports.NotificationContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var NotificationContext = _react.default.createContext();

exports.NotificationContext = NotificationContext;

var withNotification = function withNotification(Component) {
  var WithNotification = function WithNotification(props) {
    return _react.default.createElement(NotificationContext.Consumer, null, function (reference) {
      return _react.default.createElement(Component, _extends({}, props, {
        notify: function notify() {
          var _reference$current;

          return (_reference$current = reference.current).notify.apply(_reference$current, arguments);
        }
      }));
    });
  };

  var wrappedComponentName = Component.displayName || Component.name || 'Component';
  WithNotification.displayName = "withNotification(".concat(wrappedComponentName, ")");
  return WithNotification;
};

exports.withNotification = withNotification;