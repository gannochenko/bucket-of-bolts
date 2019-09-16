"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qs_1 = require("@m59/qs");
exports.injectPassword = (url, password = null) => {
    if (typeof password === 'string' && password.length) {
        const oUrl = new URL(url);
        oUrl.password = password;
        url = oUrl.toString();
    }
    return url;
};
exports.decomposeURL = (url) => {
    const oUrl = new URL(url);
    const parts = {
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
exports.putSearchParameters = (url, params) => {
    return `?${qs_1.stringify(Object.assign({}, qs_1.parse(url.replace(/^\?/, '')), params))}`;
};
exports.parseSearch = (url) => qs_1.parse(url.replace(/^\?/, ''));
exports.sanitize = (str) => str.replace(/[^a-z0-9_-]/gi, '');
exports.escapeQuote = (str) => str.replace(/"/g, '"');
//# sourceMappingURL=url.js.map