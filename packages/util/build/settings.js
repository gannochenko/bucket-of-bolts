"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = __importDefault(require("process"));
class Settings {
    async get(name, defaultValue = null) {
        if (name in process_1.default.env) {
            return process_1.default.env[name];
        }
        const otherName = name.replace(/\./g, '__').toUpperCase();
        if (otherName in process_1.default.env) {
            return process_1.default.env[otherName];
        }
        return defaultValue;
    }
    async set(name, value) { }
    async forward(list) {
        const result = {};
        if (list && list.length) {
            for (let i = 0; i < list.length; i += 1) {
                result[list[i]] = await this.get(list[i]);
            }
        }
        return result;
    }
}
exports.Settings = Settings;
//# sourceMappingURL=settings.js.map