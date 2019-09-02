"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useControllers = exports.wrapError = exports.ERROR_REQUEST = exports.ERROR_INTERNAL = void 0;

var _vault = require("./vault");

var _dtoCompiler = require("./dto-compiler");

var _result = require("./result");

var _util = require("./util");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ERROR_INTERNAL = 'internal';
exports.ERROR_INTERNAL = ERROR_INTERNAL;
var ERROR_REQUEST = 'request';
exports.ERROR_REQUEST = ERROR_REQUEST;

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

var useControllers = function useControllers(app, controllers, runtimeParameters) {
  controllers.forEach(function (controller) {
    if (!(0, _vault.hasVaultFor)(controller)) {
      return;
    }

    var _ref2 = (0, _vault.getVaultFor)(controller),
        rootEndpoint = _ref2.endpoint,
        methods = _ref2.methods;

    if ((0, _util.isStringNotEmpty)(rootEndpoint) && (0, _util.isObjectNotEmpty)(methods)) {
      Object.keys(methods).forEach(function (methodName) {
        var methodRecord = methods[methodName];
        var method = methodRecord.method,
            fn = methodRecord.fn,
            _methodRecord$endpoin = methodRecord.endpoint,
            endpoint = _methodRecord$endpoin === void 0 ? '' : _methodRecord$endpoin,
            bodyDTO = methodRecord.bodyDTO,
            outputDTO = methodRecord.outputDTO;

        if (!(0, _util.isStringNotEmpty)(method) && !(typeof fn === 'function')) {
          return;
        }

        var appFunction = null;

        if (method === 'get') {
          appFunction = app.get;
        } else if (method === 'post') {
          appFunction = app.post;
        } else if (method === 'put') {
          appFunction = app.put;
        } else if (method === 'patch') {
          appFunction = app.patch;
        } else if (method === 'delete') {
          appFunction = app.delete;
        }

        if (!appFunction) {
          throw new Error("Unsupported method produced by a decorator: ".concat(method));
        }

        appFunction("".concat(rootEndpoint, "/").concat(endpoint), wrapError(
        /*#__PURE__*/
        function () {
          var _ref3 = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee2(req, res) {
            var errors, validator, result, status, headers;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    errors = [];

                    if (!bodyDTO) {
                      _context2.next = 13;
                      break;
                    }

                    validator = (0, _dtoCompiler.getValidator)(bodyDTO);

                    if (!validator) {
                      _context2.next = 13;
                      break;
                    }

                    _context2.prev = 4;
                    _context2.next = 7;
                    return validator.validate(req.body, {
                      abortEarly: false
                    });

                  case 7:
                    req.body = (0, _dtoCompiler.filterStructure)(req.body, bodyDTO);
                    _context2.next = 13;
                    break;

                  case 10:
                    _context2.prev = 10;
                    _context2.t0 = _context2["catch"](4);

                    _context2.t0.inner.forEach(function (error) {
                      errors.push({
                        message: error.message,
                        code: 'validation',
                        type: ERROR_REQUEST
                      });
                    });

                  case 13:
                    result = null;

                    if (!errors.length) {
                      _context2.next = 19;
                      break;
                    }

                    result = new _result.Result();
                    result.errors = errors;
                    _context2.next = 22;
                    break;

                  case 19:
                    _context2.next = 21;
                    return fn(req.params || {}, {
                      req: req,
                      res: res,
                      body: req.body,
                      headers: req.headers,
                      runtime: runtimeParameters
                    });

                  case 21:
                    result = _context2.sent;

                  case 22:
                    status = 200;

                    if (result instanceof _result.Result) {
                      if (result.status) {
                        // eslint-disable-next-line prefer-destructuring
                        status = result.status;
                      } else if (result.errors.find(function (error) {
                        return error.type === ERROR_INTERNAL;
                      })) {
                        status = 500;
                      } else if (result.errors.find(function (error) {
                        return error.type === ERROR_REQUEST;
                      })) {
                        status = 400;
                      }

                      if (outputDTO) {
                        result.data = (0, _dtoCompiler.filterStructure)(result.data || [], outputDTO);
                      }
                    }

                    res.status(status);
                    headers = res.getHeaders();

                    if (!('Content-Type' in headers)) {
                      res.header('Content-Type', 'application/json');
                    }

                    return _context2.abrupt("return", res.send(JSON.stringify(result)));

                  case 28:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, null, [[4, 10]]);
          }));

          return function (_x4, _x5) {
            return _ref3.apply(this, arguments);
          };
        }()));
      });
    }
  });
};

exports.useControllers = useControllers;