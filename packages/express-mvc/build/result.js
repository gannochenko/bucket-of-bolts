"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clone_deep_1 = __importDefault(require("clone-deep"));
class Result {
    constructor() {
        this.data = {};
        this.errors = [];
        this.status = null;
    }
    toJSON() {
        return {
            data: this.data,
            errors: this.errors,
        };
    }
    setErrors(errors) {
        this.errors = clone_deep_1.default(errors);
    }
}
exports.Result = Result;
//# sourceMappingURL=result.js.map