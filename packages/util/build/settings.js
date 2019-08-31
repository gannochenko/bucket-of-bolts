"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Settings = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Settings =
/*#__PURE__*/
function () {
  function Settings() {
    _classCallCheck(this, Settings);
  }

  _createClass(Settings, [{
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(name) {
        var defaultValue,
            otherName,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                defaultValue = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;

                if (!(name in process.env)) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", process.env[name]);

              case 3:
                // network.port => NETWORK__PORT
                otherName = name.replace(/\./g, '__').toUpperCase();

                if (!(otherName in process.env)) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", process.env[otherName]);

              case 6:
                return _context.abrupt("return", defaultValue);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function get(_x) {
        return _get.apply(this, arguments);
      }

      return get;
    }() // eslint-disable-next-line no-unused-vars,no-empty-function

  }, {
    key: "set",
    value: function () {
      var _set = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(name, value) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function set(_x2, _x3) {
        return _set.apply(this, arguments);
      }

      return set;
    }()
  }, {
    key: "forward",
    value: function () {
      var _forward = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(list) {
        var result, i;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                result = {};

                if (!(list && list.length)) {
                  _context3.next = 10;
                  break;
                }

                i = 0;

              case 3:
                if (!(i < list.length)) {
                  _context3.next = 10;
                  break;
                }

                _context3.next = 6;
                return this.get(list[i]);

              case 6:
                result[list[i]] = _context3.sent;

              case 7:
                i += 1;
                _context3.next = 3;
                break;

              case 10:
                return _context3.abrupt("return", result);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function forward(_x4) {
        return _forward.apply(this, arguments);
      }

      return forward;
    }()
  }]);

  return Settings;
}();

exports.Settings = Settings;