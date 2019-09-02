"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVault = exports.hasVaultFor = exports.getVaultFor = void 0;
var vault = new Map();

var getVaultFor = function getVaultFor(key) {
  if (!vault.has(key)) {
    vault.set(key, {});
  }

  return vault.get(key);
};

exports.getVaultFor = getVaultFor;

var hasVaultFor = function hasVaultFor(obj) {
  return vault.has(obj);
};

exports.hasVaultFor = hasVaultFor;

var getVault = function getVault() {
  return vault;
};

exports.getVault = getVault;