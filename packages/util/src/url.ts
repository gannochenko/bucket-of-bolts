import { stringify, parse } from '@m59/qs';

export const injectPassword = (url, password = null) => {
    if (url === null) {
        return '';
    }

    if (typeof password === 'string' && password.length) {
        const oUrl = new URL(url);
        oUrl.password = password;

        url = oUrl.toString();
    }

    return url;
};

export const decomposeURL = url => {
    const oUrl = new URL(url);

    const parts = {
        host: oUrl.hostname,
        port: oUrl.port,
        password: oUrl.password,
    };

    if (!(typeof parts.host === 'string') || !parts.host.length) {
        // invalid url
        return null;
    }

    if (Number.isNaN(Number(parts.port))) {
        delete parts.port;
    }

    return parts;
};

export const putSearchParameters = (url, params) => {
    return `?${stringify(
        Object.assign({}, parse(url.replace(/^\?/, '')), params),
    )}`;
};

export const parseSearch = url => parse(url.replace(/^\?/, ''));

// todo: move to ew-internals
export const sanitize = str => str.replace(/[^a-z0-9_-]/gi, '');
export const escapeQuote = str => str.replace(/"/g, '"');
