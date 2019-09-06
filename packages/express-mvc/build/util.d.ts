import { NextFunction, Request, Response } from 'express';
export declare const isStringNotEmpty: (arg: unknown) => boolean;
export declare const isObject: (arg: unknown) => boolean;
export declare const isObjectNotEmpty: (arg: unknown) => boolean;
export declare const isArray: (arg: unknown) => boolean;
export declare const intersection: (...args: any[][]) => any[];
export declare const wrapError: (fn: Function) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
