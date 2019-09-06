interface Style {
    color?: {
        hover?: string;
        hout?: string;
        error?: string;
    };
    padding?: string;
}
export declare const stdLink: (style: Style) => string;
export declare const stdInput: (style: Style, hasError?: boolean, hasFocus?: null) => string;
export {};
