import { Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';

type Nullable<X = any> = X | null;

interface StringMap<P = any> {
    [key: string]: P;
}

interface IntegerMap<P = any> {
    [key: number]: P;
}

interface GenericClass {
    new (...args: any[]): {};
}

export type PropertyDescriptor = TypedPropertyDescriptor<
    (params: any) => Promise<any>
> & { initializer?: Function } & { value?: Function };

export interface InputContext<RP = any> {
    req: Request;
    res: Response;
    body: any;
    headers: IncomingHttpHeaders;
    runtime: RP;
}

export interface DTOType extends GenericClass {}

export type DTOAttributeType = DTOType | 'string' | 'number' | 'boolean';

interface MethodRecordCallbackContext<RP = any> {
    req: Request;
    res: Response;
    body: any;
    headers: IncomingHttpHeaders;
    runtime: RP;
}

export interface MethodRecord extends StringMap {
    method: string;
    endpoint: string;
    fn: (params: StringMap, context: MethodRecordCallbackContext) => void;
    bodyDTO: DTOType;
    outputDTO: DTOType;
}

export interface VaultRecord extends StringMap {}

export interface APIVaultRecord extends VaultRecord {
    endpoint: string;
    methods: StringMap<MethodRecord>;
}

export interface DTORecordParameter {
    required: boolean;
    type: DTOAttributeType | DTOAttributeType[];
}

export interface DTORecord {
    params: DTORecordParameter;
}

export interface DTOVaultRecord extends VaultRecord {
    isDTO: boolean;
    attributes: StringMap<DTORecord>;
}

export interface ResultError {
    message?: string;
    code: string;
    type?: string;
}
