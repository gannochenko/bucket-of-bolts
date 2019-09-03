import { ResultError, StringMap, Nullable } from './type';
export declare class Result {
    data?: StringMap;
    errors: ResultError[];
    status?: Nullable<number>;
    toJSON(): object;
    setErrors(errors: ResultError): void;
}
