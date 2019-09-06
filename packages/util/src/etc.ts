// @ts-ignore
import { camel } from 'naming-style';

export const uCFirst = (str: string) =>
    `${str.substr(0, 1).toUpperCase()}${str.substr(1, str.length - 1)}`;

export const lCFirst = (str: string) =>
    `${str.substr(0, 1).toLowerCase()}${str.substr(1, str.length - 1)}`;

export const convertToCamel = (str: string) => {
    const strLowerCased = camel(str.toLowerCase());
    return `${strLowerCased.substr(0, 1).toUpperCase()}${strLowerCased.substr(
        1,
        strLowerCased.length - 1,
    )}`;
};
