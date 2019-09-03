import { DTOType, VaultRecord, GenericClass } from './type';
declare type VaultKey = GenericClass | DTOType | Function;
export declare const getVaultFor: (key: VaultKey) => VaultRecord | undefined;
export declare const hasVaultFor: (obj: VaultKey) => boolean;
export declare const getVault: () => Map<VaultKey, VaultRecord>;
export {};
