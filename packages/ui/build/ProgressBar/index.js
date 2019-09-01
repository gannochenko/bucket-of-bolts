"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressBar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = require("prop-types");

var _style = require("./style");

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

var ProgressBar =
/*#__PURE__*/
function (_Component) {
  _inherits(ProgressBar, _Component);

  function ProgressBar(props) {
    var _this;

    _classCallCheck(this, ProgressBar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ProgressBar).call(this, props));
    _this.loadingBefore = false;
    _this.startTimer = null;
    _this.timer = null;
    _this.fadeTimer = null;
    _this.step = 0;
    _this.state = {
      loading: false,
      width: 0,
      shown: false,
      fading: false
    };
    return _this;
  }

  _createClass(ProgressBar, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this2 = this;

      var loadingNow = this.isLoading(this.props);
      var shown = this.state.shown;
      var _this$props = this.props,
          debounceTolerance = _this$props.debounceTolerance,
          fadeTimeout = _this$props.fadeTimeout,
          maximumStepDuration = _this$props.maximumStepDuration;

      if (loadingNow !== this.loadingBefore) {
        // preventing the transition from playing backward
        if (loadingNow && shown) {
          return;
        }

        if (!this.loadingBefore && loadingNow) {
          if (this.startTimer) {
            return;
          }

          this.startTimer = setTimeout(function () {
            // restart the process
            var stepCount = _this2.props.stepCount;
            clearTimeout(_this2.fadeTimer);
            _this2.step = 0;

            _this2.setState({
              width: 0,
              fading: false,
              shown: true
            }, function () {
              var makeStep = function makeStep() {
                _this2.timer = setTimeout(function () {
                  _this2.setState(function (_ref) {
                    var width = _ref.width;
                    return {
                      width: width + Math.floor(100 / stepCount)
                    };
                  });

                  _this2.step += 1;

                  if (_this2.step + 1 < stepCount - 1) {
                    makeStep();
                  }
                }, _this2.step ? Math.floor(Math.random() * maximumStepDuration) : 50);
              };

              makeStep();
            });
          }, debounceTolerance);
        } else if (this.loadingBefore && !loadingNow) {
          // end the process
          clearTimeout(this.startTimer);
          this.startTimer = null;
          clearTimeout(this.timer);
          this.setState({
            width: 100,
            fading: true
          });
          this.fadeTimer = setTimeout(function () {
            _this2.setState({
              shown: false
            });
          }, fadeTimeout);
        }
      }

      this.loadingBefore = loadingNow;
    }
  }, {
    key: "isLoading",
    value: function isLoading(props) {
      var state = props.state;
      var hasLoading = false;
      var pageCodes = Object.keys(state);

      for (var i = 0; i < pageCodes.length; i += 1) {
        if (state[pageCodes[i]].loading) {
          hasLoading = true;
          break;
        }
      }

      return hasLoading;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          observeGlobalLock = _this$props2.observeGlobalLock,
          children = _this$props2.children,
          theme = _this$props2.theme;

      if (observeGlobalLock && !window.splashProgressBarUnlocked) {
        return null;
      }

      var _this$state = this.state,
          shown = _this$state.shown,
          width = _this$state.width,
          fading = _this$state.fading;

      if (children) {
        return children({
          shown: shown,
          width: width,
          fading: fading
        });
      }

      return _react.default.createElement(_style.ProgressBarContainer, {
        theme: theme
      }, shown && _react.default.createElement(_style.Progress, {
        width: width,
        fading: fading,
        theme: theme
      }));
    }
  }]);

  return ProgressBar;
}(_react.Component);

exports.ProgressBar = ProgressBar;
ProgressBar.propTypes = {
  theme: _propTypes.object,
  children: _propTypes.func,
  stepCount: _propTypes.number,
  debounceTolerance: _propTypes.number,
  state: _propTypes.object,
  observeGlobalLock: _propTypes.bool,
  fadeTimeout: _propTypes.number,
  maximumStepDuration: _propTypes.number
};
ProgressBar.defaultProps = {
  theme: _style.defaultTheme,
  children: null,
  stepCount: 15,
  debounceTolerance: 200,
  state: {},
  observeGlobalLock: false,
  fadeTimeout: 1000,
  maximumStepDuration: 1000
};