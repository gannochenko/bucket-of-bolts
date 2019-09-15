"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withModal = exports.ModalContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ModalContext = _react.default.createContext();

exports.ModalContext = ModalContext;

var withModal = function withModal(Component) {
  var WithModal = function WithModal(props) {
    return _react.default.createElement(ModalContext.Consumer, null, function (reference) {
      return _react.default.createElement(Component, _extends({}, props, {
        openModal: function openModal() {
          var _reference$current;

          return (_reference$current = reference.current).openExternal.apply(_reference$current, arguments);
        },
        openConfirmModal: function openConfirmModal() {
          var _reference$current2;

          return (_reference$current2 = reference.current).openConfirm.apply(_reference$current2, arguments);
        },
        closeModal: function closeModal() {
          var _reference$current3;

          return (_reference$current3 = reference.current).closeExternal.apply(_reference$current3, arguments);
        }
      }));
    });
  };

  var wrappedComponentName = Component.displayName || Component.name || 'Component';
  WithModal.displayName = "withModal(".concat(wrappedComponentName, ")");
  return WithModal;
};

exports.withModal = withModal;