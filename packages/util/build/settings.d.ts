interface ObjectLiteral {
    [k: string]: any;
}
export declare class Settings {
    get(name: string, defaultValue?: any): Promise<any>;
    set(name: string, value: any): Promise<void>;
    forward(list: string[]): Promise<ObjectLiteral>;
}
export {};
