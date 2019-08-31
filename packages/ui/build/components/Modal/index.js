'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.Modal = void 0;

var _react = _interopRequireDefault(require('react'));

var _propTypes = require('prop-types');

var _style = require('./style');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _typeof(obj) {
    if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj &&
                typeof Symbol === 'function' &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? 'symbol'
                : typeof obj;
        };
    }
    return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
        return call;
    }
    return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called",
        );
    }
    return self;
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function _getPrototypeOf(o) {
              return o.__proto__ || Object.getPrototypeOf(o);
          };
    return _getPrototypeOf(o);
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError(
            'Super expression must either be null or a function',
        );
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: { value: subClass, writable: true, configurable: true },
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf =
        Object.setPrototypeOf ||
        function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };
    return _setPrototypeOf(o, p);
}

var Modal =
    /*#__PURE__*/
    (function(_React$Component) {
        _inherits(Modal, _React$Component);

        function Modal(props) {
            var _this;

            _classCallCheck(this, Modal);

            _this = _possibleConstructorReturn(
                this,
                _getPrototypeOf(Modal).call(this, props),
            );

            _this.open = function(children) {
                _this.setState({
                    open: true,
                    children: children,
                });
            };

            _this.close = function() {
                _this.setState({
                    open: false,
                    children: function children() {},
                });
            };

            _this.openExternal = function(children) {
                if (_this.props.active) {
                    _this.open(children);
                }
            };

            _this.closeExternal = function() {
                if (_this.props.active) {
                    _this.close();
                }

                _this.props.onClose();
            };

            _this.onOpenClick = function() {
                _this.openExternal();
            };

            _this.onCloseClick = function() {
                _this.closeExternal();
            };

            _this.openConfirm = function() {
                var question =
                    arguments.length > 0 && arguments[0] !== undefined
                        ? arguments[0]
                        : 'A very important question';
                var buttons =
                    arguments.length > 1 && arguments[1] !== undefined
                        ? arguments[1]
                        : function() {};

                _this.openExternal(function() {
                    return _react.default.createElement(
                        _react.default.Fragment,
                        null,
                        _react.default.createElement(
                            _style.Question,
                            null,
                            question,
                        ),
                        _react.default.createElement(
                            _style.Buttons,
                            null,
                            buttons.apply(void 0, arguments),
                        ),
                    );
                });
            };

            _this.state = {
                open: false,
                children: function children() {},
            };
            return _this;
        }

        _createClass(Modal, [
            {
                key: 'render',
                value: function render() {
                    var _this$props = this.props,
                        children = _this$props.children,
                        central = _this$props.central,
                        active = _this$props.active,
                        open = _this$props.open,
                        theme = _this$props.theme;
                    var stateChildren = this.state.children;

                    if (!active && !open) {
                        return null;
                    }

                    if (active && !this.state.open) {
                        return null;
                    }

                    return _react.default.createElement(
                        _style.Overlay,
                        {
                            central: central,
                            onWheel: function onWheel(e) {
                                return e.preventDefault();
                            },
                            theme: theme,
                        },
                        _react.default.createElement(
                            _style.Panel,
                            {
                                theme: theme,
                            },
                            _react.default.createElement(_style.Cross, {
                                theme: theme,
                                onClick: this.onCloseClick,
                            }),
                            _react.default.createElement(
                                _style.PanelOffset,
                                {
                                    theme: theme,
                                },
                                !!stateChildren &&
                                    stateChildren({
                                        closeModal: this.onCloseClick,
                                    }),
                                !stateChildren &&
                                    children({
                                        closeModal: this.onCloseClick,
                                    }),
                            ),
                        ),
                    );
                },
            },
        ]);

        return Modal;
    })(_react.default.Component);

exports.Modal = Modal;
Modal.propTypes = {
    active: _propTypes.bool,
    // if active is set to true, the modal controls whether it is open or not internally
    open: _propTypes.bool,
    onClose: _propTypes.func,
    central: _propTypes.bool,
    theme: _propTypes.object,
    children: _propTypes.func,
};
Modal.defaultProps = {
    active: false,
    open: false,
    onClose: function onClose() {},
    central: false,
    theme: _style.defaultTheme,
    children: function children() {},
};
