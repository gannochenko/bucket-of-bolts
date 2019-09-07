declare type Nullable<T> = T | null;
export declare const logDebug: (message: string) => void;
export declare const logInfo: (message: string) => void;
export declare const logWarning: (message: string) => void;
export declare const logError: (message: string, messageError?: Nullable<Error>) => void;
export {};
