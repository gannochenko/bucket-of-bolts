"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var vault_1 = require("./vault");
var dto_compiler_1 = require("./dto-compiler");
var result_1 = require("./result");
var util_1 = require("./util");
exports.ERROR_INTERNAL = 'internal';
exports.ERROR_REQUEST = 'request';
exports.wrapError = function (fn) { return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, fn(req, res, next)];
            case 1:
                _a.sent();
                return [3, 3];
            case 2:
                e_1 = _a.sent();
                next(e_1);
                return [3, 3];
            case 3: return [2];
        }
    });
}); }; };
exports.useControllers = function (app, controllers, runtimeParameters) {
    controllers.forEach(function (controller) {
        if (!vault_1.hasVaultFor(controller)) {
            return;
        }
        var _a = vault_1.getVaultFor(controller), rootEndpoint = _a.endpoint, methods = _a.methods;
        if (util_1.isStringNotEmpty(rootEndpoint) && util_1.isObjectNotEmpty(methods)) {
            Object.keys(methods).forEach(function (methodName) {
                var methodRecord = methods[methodName];
                var method = methodRecord.method, fn = methodRecord.fn, _a = methodRecord.endpoint, endpoint = _a === void 0 ? '' : _a, bodyDTO = methodRecord.bodyDTO, outputDTO = methodRecord.outputDTO;
                if (!util_1.isStringNotEmpty(method) && !(typeof fn === 'function')) {
                    return;
                }
                var appFunction = null;
                if (method === 'get') {
                    appFunction = app.get;
                }
                else if (method === 'post') {
                    appFunction = app.post;
                }
                else if (method === 'put') {
                    appFunction = app.put;
                }
                else if (method === 'patch') {
                    appFunction = app.patch;
                }
                else if (method === 'delete') {
                    appFunction = app.delete;
                }
                if (!appFunction) {
                    throw new Error("Unsupported method produced by a decorator: " + method);
                }
                appFunction(rootEndpoint + "/" + endpoint, exports.wrapError(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                    var errors, validator, e_2, result, status, headers;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                errors = [];
                                if (!bodyDTO) return [3, 4];
                                validator = dto_compiler_1.getValidator(bodyDTO);
                                if (!validator) return [3, 4];
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4, validator.validate(req.body, {
                                        abortEarly: false,
                                    })];
                            case 2:
                                _a.sent();
                                req.body = dto_compiler_1.filterStructure(req.body, bodyDTO);
                                return [3, 4];
                            case 3:
                                e_2 = _a.sent();
                                e_2.inner.forEach(function (error) {
                                    errors.push({
                                        message: error.message,
                                        code: 'validation',
                                        type: exports.ERROR_REQUEST,
                                    });
                                });
                                return [3, 4];
                            case 4:
                                result = null;
                                if (!errors.length) return [3, 5];
                                result = new result_1.Result();
                                result.errors = errors;
                                return [3, 7];
                            case 5: return [4, fn(req.params || {}, {
                                    req: req,
                                    res: res,
                                    body: req.body,
                                    headers: req.headers,
                                    runtime: runtimeParameters,
                                })];
                            case 6:
                                result = _a.sent();
                                _a.label = 7;
                            case 7:
                                status = 200;
                                if (result instanceof result_1.Result) {
                                    if (result.status) {
                                        status = result.status;
                                    }
                                    else if (result.errors.find(function (error) { return error.type === exports.ERROR_INTERNAL; })) {
                                        status = 500;
                                    }
                                    else if (result.errors.find(function (error) { return error.type === exports.ERROR_REQUEST; })) {
                                        status = 400;
                                    }
                                    if (outputDTO) {
                                        result.data = dto_compiler_1.filterStructure(result.data || [], outputDTO);
                                    }
                                }
                                res.status(status);
                                headers = res.getHeaders();
                                if (!('Content-Type' in headers)) {
                                    res.header('Content-Type', 'application/json');
                                }
                                return [2, res.send(JSON.stringify(result))];
                        }
                    });
                }); }));
            });
        }
    });
};
//# sourceMappingURL=api.js.map