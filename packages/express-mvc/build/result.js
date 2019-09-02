"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Result = void 0;

var _cloneDeep = _interopRequireDefault(require("clone-deep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Result =
/*#__PURE__*/
function () {
  function Result() {
    _classCallCheck(this, Result);

    this.data = {};
    this.errors = [];
    this.status = null;
  }

  _createClass(Result, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        data: this.data,
        errors: this.errors
      };
    }
  }, {
    key: "setErrors",
    value: function setErrors(errors) {
      this.errors = (0, _cloneDeep.default)(errors);
    }
  }]);

  return Result;
}();

exports.Result = Result;