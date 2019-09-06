"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var qs_1 = require("@m59/qs");
exports.injectPassword = function (url, password) {
    if (password === void 0) { password = null; }
    if (typeof password === 'string' && password.length) {
        var oUrl = new URL(url);
        oUrl.password = password;
        url = oUrl.toString();
    }
    return url;
};
exports.decomposeURL = function (url) {
    var oUrl = new URL(url);
    var parts = {
        host: oUrl.hostname,
        port: oUrl.port,
        password: oUrl.password,
    };
    if (!parts.host.length) {
        return null;
    }
    if (Number.isNaN(Number(parts.port))) {
        delete parts.port;
    }
    return parts;
};
exports.putSearchParameters = function (url, params) {
    return "?" + qs_1.stringify(Object.assign({}, qs_1.parse(url.replace(/^\?/, '')), params));
};
exports.parseSearch = function (url) { return qs_1.parse(url.replace(/^\?/, '')); };
exports.sanitize = function (str) { return str.replace(/[^a-z0-9_-]/gi, ''); };
exports.escapeQuote = function (str) { return str.replace(/"/g, '"'); };
//# sourceMappingURL=url.js.map