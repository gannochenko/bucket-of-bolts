"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const naming_style_1 = require("naming-style");
exports.uCFirst = (str) => `${str.substr(0, 1).toUpperCase()}${str.substr(1, str.length - 1)}`;
exports.lCFirst = (str) => `${str.substr(0, 1).toLowerCase()}${str.substr(1, str.length - 1)}`;
exports.convertToCamel = (str) => {
    const strLowerCased = naming_style_1.camel(str.toLowerCase());
    return `${strLowerCased.substr(0, 1).toUpperCase()}${strLowerCased.substr(1, strLowerCased.length - 1)}`;
};
//# sourceMappingURL=etc.js.map