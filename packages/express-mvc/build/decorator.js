"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vault_1 = require("./vault");
exports.Endpoint = (endpoint) => {
    return (constructor) => {
        const vault = vault_1.getVaultFor(constructor);
        vault.endpoint = endpoint;
        return constructor;
    };
};
exports.Get = (endpoint) => {
    return (target, property, descriptor) => {
        const vault = vault_1.getVaultFor(target.constructor);
        vault.methods = vault.methods || {};
        vault.methods[property] = vault.methods[property] || {};
        Object.assign(vault.methods[property], {
            endpoint,
            method: 'get',
            fn: descriptor.value,
        });
        return descriptor;
    };
};
exports.Post = (endpoint) => {
    return (target, property, descriptor) => {
        const vault = vault_1.getVaultFor(target.constructor);
        vault.methods = vault.methods || {};
        vault.methods[property] = vault.methods[property] || {};
        Object.assign(vault.methods[property], {
            endpoint,
            method: 'post',
            fn: descriptor.value,
        });
        return descriptor;
    };
};
exports.Put = (endpoint) => {
    return (target, property, descriptor) => {
        const vault = vault_1.getVaultFor(target.constructor);
        vault.methods = vault.methods || {};
        vault.methods[property] = vault.methods[property] || {};
        Object.assign(vault.methods[property], {
            endpoint,
            method: 'put',
            fn: descriptor.value,
        });
        return descriptor;
    };
};
exports.Patch = (endpoint) => {
    return (target, property, descriptor) => {
        const vault = vault_1.getVaultFor(target.constructor);
        vault.methods = vault.methods || {};
        vault.methods[property] = vault.methods[property] || {};
        Object.assign(vault.methods[property], {
            endpoint,
            method: 'patch',
            fn: descriptor.value,
        });
        return descriptor;
    };
};
exports.Delete = (endpoint) => {
    return (target, property, descriptor) => {
        const vault = vault_1.getVaultFor(target.constructor);
        vault.methods = vault.methods || {};
        vault.methods[property] = vault.methods[property] || {};
        Object.assign(vault.methods[property], {
            endpoint,
            method: 'delete',
            fn: descriptor.value,
        });
        return descriptor;
    };
};
exports.BodyInput = (dto) => {
    return (target, property, descriptor) => {
        const vault = vault_1.getVaultFor(target.constructor);
        vault.methods = vault.methods || {};
        vault.methods[property] = vault.methods[property] || {};
        Object.assign(vault.methods[property], {
            bodyDTO: dto,
        });
        return descriptor;
    };
};
exports.Output = (dto) => {
    return (target, property, descriptor) => {
        const vault = vault_1.getVaultFor(target.constructor);
        vault.methods = vault.methods || {};
        vault.methods[property] = vault.methods[property] || {};
        Object.assign(vault.methods[property], {
            outputDTO: dto,
        });
        return descriptor;
    };
};
exports.DTO = () => {
    return (constructor) => {
        const vault = vault_1.getVaultFor(constructor);
        vault.isDTO = true;
        return constructor;
    };
};
exports.Attribute = (params) => {
    return (target, property, descriptor) => {
        const vault = vault_1.getVaultFor(target.constructor);
        vault.attributes = vault.attributes || {};
        vault.attributes[property] = Object.assign({}, {
            params,
        });
        return descriptor;
    };
};
//# sourceMappingURL=decorator.js.map