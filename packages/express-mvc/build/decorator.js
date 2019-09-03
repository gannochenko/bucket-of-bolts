"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vault_1 = require("./vault");
exports.Endpoint = function (endpoint) {
    return function (constructor) {
        var vault = vault_1.getVaultFor(constructor);
        vault.endpoint = endpoint;
        return constructor;
    };
};
exports.Get = function (endpoint) {
    return function (target, property, descriptor) {
        var vault = vault_1.getVaultFor(target.constructor);
        vault.methods = vault.methods || {};
        vault.methods[property] = vault.methods[property] || {};
        Object.assign(vault.methods[property], {
            endpoint: endpoint,
            method: 'get',
            fn: descriptor.value,
        });
        return descriptor;
    };
};
exports.Post = function (endpoint) {
    return function (target, property, descriptor) {
        var vault = vault_1.getVaultFor(target.constructor);
        vault.methods = vault.methods || {};
        vault.methods[property] = vault.methods[property] || {};
        Object.assign(vault.methods[property], {
            endpoint: endpoint,
            method: 'post',
            fn: descriptor.value,
        });
        return descriptor;
    };
};
exports.Put = function (endpoint) {
    return function (target, property, descriptor) {
        var vault = vault_1.getVaultFor(target.constructor);
        vault.methods = vault.methods || {};
        vault.methods[property] = vault.methods[property] || {};
        Object.assign(vault.methods[property], {
            endpoint: endpoint,
            method: 'put',
            fn: descriptor.value,
        });
        return descriptor;
    };
};
exports.Patch = function (endpoint) {
    return function (target, property, descriptor) {
        var vault = vault_1.getVaultFor(target.constructor);
        vault.methods = vault.methods || {};
        vault.methods[property] = vault.methods[property] || {};
        Object.assign(vault.methods[property], {
            endpoint: endpoint,
            method: 'patch',
            fn: descriptor.value,
        });
        return descriptor;
    };
};
exports.Delete = function (endpoint) {
    return function (target, property, descriptor) {
        var vault = vault_1.getVaultFor(target.constructor);
        vault.methods = vault.methods || {};
        vault.methods[property] = vault.methods[property] || {};
        Object.assign(vault.methods[property], {
            endpoint: endpoint,
            method: 'delete',
            fn: descriptor.value,
        });
        return descriptor;
    };
};
exports.BodyInput = function (dto) {
    return function (target, property, descriptor) {
        var vault = vault_1.getVaultFor(target.constructor);
        vault.methods = vault.methods || {};
        vault.methods[property] = vault.methods[property] || {};
        Object.assign(vault.methods[property], {
            bodyDTO: dto,
        });
        return descriptor;
    };
};
exports.Output = function (dto) {
    return function (target, property, descriptor) {
        var vault = vault_1.getVaultFor(target.constructor);
        vault.methods = vault.methods || {};
        vault.methods[property] = vault.methods[property] || {};
        Object.assign(vault.methods[property], {
            outputDTO: dto,
        });
        return descriptor;
    };
};
exports.DTO = function () {
    return function (constructor) {
        var vault = vault_1.getVaultFor(constructor);
        vault.isDTO = true;
        return constructor;
    };
};
exports.Attribute = function (params) {
    return function (target, property, descriptor) {
        var vault = vault_1.getVaultFor(target.constructor);
        vault.attributes = vault.attributes || {};
        vault.attributes[property] = Object.assign({}, {
            params: params,
        });
        return descriptor;
    };
};
//# sourceMappingURL=decorator.js.map