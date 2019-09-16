"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vault_1 = require("./vault");
const dto_compiler_1 = require("./dto-compiler");
const result_1 = require("./result");
const util_1 = require("./util");
exports.ERROR_INTERNAL = 'internal';
exports.ERROR_REQUEST = 'request';
exports.useControllers = (app, controllers, runtimeParameters) => {
    controllers.forEach(controller => {
        if (!vault_1.hasVaultFor(controller)) {
            return;
        }
        const { endpoint: rootEndpoint, methods } = vault_1.getVaultFor(controller);
        if (util_1.isStringNotEmpty(rootEndpoint) && util_1.isObjectNotEmpty(methods)) {
            Object.keys(methods).forEach((methodName) => {
                const methodRecord = methods[methodName];
                const { method, fn, endpoint = '', bodyDTO, outputDTO, } = methodRecord;
                if (!util_1.isStringNotEmpty(method) && !(typeof fn === 'function')) {
                    return;
                }
                let appFunction = null;
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
                    throw new Error(`Unsupported method produced by a decorator: ${method}`);
                }
                appFunction.apply(app, [
                    `${rootEndpoint}/${endpoint}`,
                    util_1.wrapError(async (req, res) => {
                        const errors = [];
                        if (bodyDTO) {
                            const validator = dto_compiler_1.getValidator(bodyDTO);
                            if (validator) {
                                try {
                                    await validator.validate(req.body, {
                                        abortEarly: false,
                                    });
                                    req.body = dto_compiler_1.filterStructure(req.body, bodyDTO);
                                }
                                catch (e) {
                                    e.inner.forEach((error) => {
                                        errors.push({
                                            message: error.message,
                                            code: 'validation',
                                            type: exports.ERROR_REQUEST,
                                        });
                                    });
                                }
                            }
                        }
                        let result = null;
                        if (errors.length) {
                            result = new result_1.Result();
                            result.errors = errors;
                        }
                        else {
                            result = await fn(req.params || {}, {
                                req,
                                res,
                                body: req.body,
                                headers: req.headers,
                                runtime: runtimeParameters,
                            });
                        }
                        let status = 200;
                        if (result instanceof result_1.Result) {
                            if (result.status) {
                                status = result.status;
                            }
                            else if (result.errors.find(error => error.type === exports.ERROR_INTERNAL)) {
                                status = 500;
                            }
                            else if (result.errors.find(error => error.type === exports.ERROR_REQUEST)) {
                                status = 400;
                            }
                            if (outputDTO) {
                                result.data = dto_compiler_1.filterStructure(result.data || [], outputDTO);
                            }
                        }
                        res.status(status);
                        const headers = res.getHeaders();
                        if (!('Content-Type' in headers)) {
                            res.header('Content-Type', 'application/json');
                        }
                        return res.send(JSON.stringify(result));
                    }),
                ]);
            });
        }
    });
};
//# sourceMappingURL=api.js.map