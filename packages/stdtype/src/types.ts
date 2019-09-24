export interface ObjectLiteral<P = any> {
    [k: string]: P;
}

export type Nullable<P> = P | null;
