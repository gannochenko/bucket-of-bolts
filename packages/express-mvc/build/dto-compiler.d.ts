import { DTOType, StringMap } from './type';
export declare const getValidator: (dto: DTOType, depth?: number) => any;
export declare const filterStructure: (structure: StringMap<any>, dto: DTOType, depth?: number) => StringMap<any>;
