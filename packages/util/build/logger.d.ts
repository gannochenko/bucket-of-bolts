declare type Nullable<T> = T | null;
export declare const debug: (message: string) => void;
export declare const info: (message: string) => void;
export declare const warn: (message: string) => void;
export declare const error: (message: string, messageError?: Nullable<Error>) => void;
export {};
