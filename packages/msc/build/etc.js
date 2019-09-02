"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToCamel = exports.lCFirst = exports.uCFirst = exports.wrapError = void 0;

var _namingStyle = require("naming-style");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var wrapError = function wrapError(fn) {
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return fn(req, res, next);

              case 3:
                _context.next = 8;
                break;

              case 5:
                _context.prev = 5;
                _context.t0 = _context["catch"](0);
                next(_context.t0);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 5]]);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};

exports.wrapError = wrapError;

var uCFirst = function uCFirst(str) {
  return "".concat(str.substr(0, 1).toUpperCase()).concat(str.substr(1, str.length - 1));
};

exports.uCFirst = uCFirst;

var lCFirst = function lCFirst(str) {
  return "".concat(str.substr(0, 1).toLowerCase()).concat(str.substr(1, str.length - 1));
};

exports.lCFirst = lCFirst;

var convertToCamel = function convertToCamel(str) {
  var strLowerCased = (0, _namingStyle.camel)(str.toLowerCase());
  return "".concat(strLowerCased.substr(0, 1).toUpperCase()).concat(strLowerCased.substr(1, strLowerCased.length - 1));
};

exports.convertToCamel = convertToCamel;