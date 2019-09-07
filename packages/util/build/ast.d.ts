import { Nullable, ASTNode } from './type';
export declare const getASTAt: (ast?: Nullable<ASTNode>, path?: string) => Nullable<ASTNode>;
export declare const getSelectionAt: (ast: Nullable<ASTNode>, path?: string) => string[];
