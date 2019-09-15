interface TimeLineItem {
    key: string;
    weekDay: number;
    day: number;
    month: number;
    year: number;
    selected: boolean;
    currentMonth: boolean;
}
export declare const convertLocalDateToUTC: (date: Date) => Date;
export declare const convertUTCToDate: (date: Date) => Date;
export declare const getCalendar: (date: Date, chosen?: string | Date | null) => {
    cMonth: number;
    grid: TimeLineItem[][];
};
export {};
