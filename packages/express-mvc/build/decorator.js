"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Attribute = exports.DTO = exports.Output = exports.BodyInput = exports.Delete = exports.Patch = exports.Put = exports.Post = exports.Get = exports.Endpoint = void 0;

var _vault = require("./vault");

var Endpoint = function Endpoint(endpoint) {
  return function (constructor) {
    var vault = (0, _vault.getVaultFor)(constructor);
    vault.endpoint = endpoint;
    return constructor;
  };
};

exports.Endpoint = Endpoint;

var Get = function Get(endpoint) {
  return function (target, property, descriptor) {
    var vault = (0, _vault.getVaultFor)(target.constructor);
    vault.methods = vault.methods || {};
    vault.methods[property] = vault.methods[property] || {};
    Object.assign(vault.methods[property], {
      endpoint: endpoint,
      method: 'get',
      fn: descriptor.value
    });
    return descriptor;
  };
};

exports.Get = Get;

var Post = function Post(endpoint) {
  return function (target, property, descriptor) {
    var vault = (0, _vault.getVaultFor)(target.constructor);
    vault.methods = vault.methods || {};
    vault.methods[property] = vault.methods[property] || {};
    Object.assign(vault.methods[property], {
      endpoint: endpoint,
      method: 'post',
      fn: descriptor.value
    });
    return descriptor;
  };
};

exports.Post = Post;

var Put = function Put(endpoint) {
  return function (target, property, descriptor) {
    var vault = (0, _vault.getVaultFor)(target.constructor);
    vault.methods = vault.methods || {};
    vault.methods[property] = vault.methods[property] || {};
    Object.assign(vault.methods[property], {
      endpoint: endpoint,
      method: 'put',
      fn: descriptor.value
    });
    return descriptor;
  };
};

exports.Put = Put;

var Patch = function Patch(endpoint) {
  return function (target, property, descriptor) {
    var vault = (0, _vault.getVaultFor)(target.constructor);
    vault.methods = vault.methods || {};
    vault.methods[property] = vault.methods[property] || {};
    Object.assign(vault.methods[property], {
      endpoint: endpoint,
      method: 'patch',
      fn: descriptor.value
    });
    return descriptor;
  };
};

exports.Patch = Patch;

var Delete = function Delete(endpoint) {
  return function (target, property, descriptor) {
    var vault = (0, _vault.getVaultFor)(target.constructor);
    vault.methods = vault.methods || {};
    vault.methods[property] = vault.methods[property] || {};
    Object.assign(vault.methods[property], {
      endpoint: endpoint,
      method: 'delete',
      fn: descriptor.value
    });
    return descriptor;
  };
};

exports.Delete = Delete;

var BodyInput = function BodyInput(dto) {
  return function (target, property, descriptor) {
    var vault = (0, _vault.getVaultFor)(target.constructor);
    vault.methods = vault.methods || {};
    vault.methods[property] = vault.methods[property] || {};
    Object.assign(vault.methods[property], {
      bodyDTO: dto
    });
    return descriptor;
  };
};

exports.BodyInput = BodyInput;

var Output = function Output(dto) {
  return function (target, property, descriptor) {
    var vault = (0, _vault.getVaultFor)(target.constructor);
    vault.methods = vault.methods || {};
    vault.methods[property] = vault.methods[property] || {};
    Object.assign(vault.methods[property], {
      outputDTO: dto
    });
    return descriptor;
  };
};

exports.Output = Output;

var DTO = function DTO() {
  return function (constructor) {
    var vault = (0, _vault.getVaultFor)(constructor);
    vault.isDTO = true;
    return constructor;
  };
};

exports.DTO = DTO;

var Attribute = function Attribute(params) {
  return function (target, property, descriptor) {
    var vault = (0, _vault.getVaultFor)(target.constructor);
    vault.attributes = vault.attributes || {};
    vault.attributes[property] = Object.assign({}, {
      params: params
    });
    return descriptor;
  };
};

exports.Attribute = Attribute;