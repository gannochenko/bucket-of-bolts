interface ObjectLiteral {
    [k: string]: any;
}
export declare const injectPassword: (url: string, password?: string | null) => string;
export declare const decomposeURL: (url: string) => {
    host: string;
    port: string;
    password: string;
} | null;
export declare const putSearchParameters: (url: string, params: ObjectLiteral) => string;
export declare const parseSearch: (url: string) => any;
export declare const sanitize: (str: string) => string;
export declare const escapeQuote: (str: string) => string;
export {};
