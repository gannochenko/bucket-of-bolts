"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var clone_deep_1 = __importDefault(require("clone-deep"));
var Result = (function () {
    function Result() {
        this.data = {};
        this.errors = [];
        this.status = null;
    }
    Result.prototype.toJSON = function () {
        return {
            data: this.data,
            errors: this.errors,
        };
    };
    Result.prototype.setErrors = function (errors) {
        this.errors = clone_deep_1.default(errors);
    };
    return Result;
}());
exports.Result = Result;
//# sourceMappingURL=result.js.map