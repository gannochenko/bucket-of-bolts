interface Theme {
    [k: string]: string | number | boolean | string[] | number[] | boolean[] | Theme | object;
}
export declare const grid: (config?: Theme, theme?: Theme) => string;
export declare const cell: (config?: Theme, theme?: Theme) => string;
export declare const media: (rules?: Theme, theme?: Theme) => string;
export {};
