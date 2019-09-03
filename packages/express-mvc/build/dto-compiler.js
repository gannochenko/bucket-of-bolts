"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var yup = __importStar(require("yup"));
var vault_1 = require("./vault");
var util_1 = require("./util");
var cache = new Map();
exports.getValidator = function (dto, depth) {
    if (depth === void 0) { depth = 1; }
    if (depth > 30) {
        return null;
    }
    var vault = vault_1.getVaultFor(dto);
    if (!vault || !vault.isDTO) {
        return null;
    }
    if (depth === 1 && cache.has(dto)) {
        return cache.get(dto);
    }
    var result = yup.object();
    var attributes = vault.attributes;
    if (!util_1.isObjectNotEmpty(attributes)) {
        return result;
    }
    Object.keys(attributes).forEach(function (attributeName) {
        var _a = attributes[attributeName].params, required = _a.required, type = _a.type;
        var shape = {};
        var subType = null;
        var fieldType;
        var isArr = false;
        if (util_1.isArray(type)) {
            fieldType = type[0];
            isArr = true;
        }
        else {
            fieldType = type;
        }
        if (typeof fieldType === 'function') {
            subType = exports.getValidator(fieldType, depth + 1);
        }
        else {
            if (fieldType === 'string') {
                subType = yup.string();
            }
            else if (fieldType === 'number') {
                subType = yup.number();
            }
            else if (fieldType === 'boolean') {
                subType = yup.boolean();
            }
            else {
                subType = yup.string();
            }
        }
        if (subType === null) {
            throw new Error("No DTO found for \"" + attributeName + "\" attribute");
        }
        if (isArr) {
            subType = yup.array().of(subType);
        }
        if (required) {
            subType = subType.required();
        }
        subType = subType.typeError("Member \"" + attributeName + "\" should be of type \"" + type + "\"");
        shape[attributeName] = subType;
        result = result.shape(shape);
    });
    if (depth === 1) {
        cache.set(dto, result);
    }
    return result;
};
exports.filterStructure = function (structure, dto, depth) {
    if (depth === void 0) { depth = 1; }
    if (depth > 30) {
        return {};
    }
    var vault = vault_1.getVaultFor(dto);
    if (!vault || !vault.isDTO) {
        return {};
    }
    var attributes = vault.attributes;
    if (!util_1.isObjectNotEmpty(attributes)) {
        return {};
    }
    var legalKeys = util_1.intersection(Object.keys(structure), Object.keys(attributes));
    var result = {};
    legalKeys.forEach(function (key) {
        var attribute = attributes[key];
        var type = attribute.params.type;
        var structureValue = structure[key];
        if (util_1.isArray(type)) {
            var subType_1 = type[0];
            if (util_1.isArray(structure[key])) {
                if (typeof subType_1 === 'function') {
                    result[key] = structureValue.map(function (subValue) {
                        return exports.filterStructure(subValue, subType_1, depth + 1);
                    });
                }
                else {
                    result[key] = structureValue;
                }
            }
            else {
                result[key] = [];
            }
        }
        else {
            if (typeof type === 'function') {
                result[key] = exports.filterStructure(structureValue, type, depth + 1);
            }
            else {
                result[key] = structureValue;
            }
        }
    });
    return result;
};
//# sourceMappingURL=dto-compiler.js.map