import { Express } from 'express';
import { GenericClass } from './type';
export declare const ERROR_INTERNAL = "internal";
export declare const ERROR_REQUEST = "request";
export declare const useControllers: (app: Express, controllers: GenericClass[], runtimeParameters: any) => void;
