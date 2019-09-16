"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup = __importStar(require("yup"));
const vault_1 = require("./vault");
const util_1 = require("./util");
const cache = new Map();
exports.getValidator = (dto, depth = 1) => {
    if (depth > 30) {
        return null;
    }
    const vault = vault_1.getVaultFor(dto);
    if (!vault || !vault.isDTO) {
        return null;
    }
    if (depth === 1 && cache.has(dto)) {
        return cache.get(dto);
    }
    let result = yup.object();
    const { attributes } = vault;
    if (!util_1.isObjectNotEmpty(attributes)) {
        return result;
    }
    Object.keys(attributes).forEach(attributeName => {
        const { params: { required, type }, } = attributes[attributeName];
        const shape = {};
        let subType = null;
        let fieldType;
        let isArr = false;
        if (util_1.isArray(type)) {
            [fieldType] = type;
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
            throw new Error(`No DTO found for "${attributeName}" attribute`);
        }
        if (isArr) {
            subType = yup.array().of(subType);
        }
        if (required) {
            subType = subType.required();
        }
        subType = subType.typeError(`Member "${attributeName}" should be of type "${type}"`);
        shape[attributeName] = subType;
        result = result.shape(shape);
    });
    if (depth === 1) {
        cache.set(dto, result);
    }
    return result;
};
exports.filterStructure = (structure, dto, depth = 1) => {
    if (depth > 30) {
        return {};
    }
    const vault = vault_1.getVaultFor(dto);
    if (!vault || !vault.isDTO) {
        return {};
    }
    const { attributes } = vault;
    if (!util_1.isObjectNotEmpty(attributes)) {
        return {};
    }
    const legalKeys = util_1.intersection(Object.keys(structure), Object.keys(attributes));
    const result = {};
    legalKeys.forEach((key) => {
        const attribute = attributes[key];
        const { params: { type }, } = attribute;
        const structureValue = structure[key];
        if (util_1.isArray(type)) {
            const [subType] = type;
            if (util_1.isArray(structure[key])) {
                if (typeof subType === 'function') {
                    result[key] = structureValue.map((subValue) => exports.filterStructure(subValue, subType, depth + 1));
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