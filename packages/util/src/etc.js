import { camel } from 'naming-style';

export const wrapError = fn => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (e) {
        next(e);
    }
};

export const uCFirst = str =>
    `${str.substr(0, 1).toUpperCase()}${str.substr(1, str.length - 1)}`;

export const lCFirst = str =>
    `${str.substr(0, 1).toLowerCase()}${str.substr(1, str.length - 1)}`;

export const convertToCamel = str => {
    const strLowerCased = camel(str.toLowerCase());
    return `${strLowerCased.substr(0, 1).toUpperCase()}${strLowerCased.substr(
        1,
        strLowerCased.length - 1,
    )}`;
};
