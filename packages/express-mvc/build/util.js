"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.intersection = exports.isArray = exports.isObjectNotEmpty = exports.isObject = exports.isStringNotEmpty = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isStringNotEmpty = function isStringNotEmpty(arg) {
  return typeof arg === 'string' && arg.length > 0;
};

exports.isStringNotEmpty = isStringNotEmpty;

var isObject = function isObject(arg) {
  return arg !== null && (_typeof(arg) === 'object' || typeof arg === 'function');
};

exports.isObject = isObject;

var isObjectNotEmpty = function isObjectNotEmpty(arg) {
  return isObject(arg) && Object.keys(arg).length > 0;
};

exports.isObjectNotEmpty = isObjectNotEmpty;

var isArray = function isArray(arg) {
  return Array.isArray(arg);
};

exports.isArray = isArray;

var intersection = function intersection() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.reduce(function (a, b) {
    return a.filter(function (c) {
      return b.includes(c);
    });
  });
};

exports.intersection = intersection;