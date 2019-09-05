declare const _default: {
    isArray: (arg: any) => arg is any[];
    isObject: (arg: unknown) => boolean;
    isFunction: (arg: unknown) => boolean;
    isArrayNotEmpty: (arg: unknown) => boolean;
    isObjectNotEmpty: (arg: unknown) => boolean;
    isStringNotEmpty: (arg: unknown) => boolean;
    union: (arg1: any[], arg2: any[]) => any[];
    intersection: (...args: any[][]) => any[];
    difference: (...args: any[][]) => any[];
};
export default _default;
