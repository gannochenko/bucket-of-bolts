"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
exports.convertLocalDateToUTC = (date) => {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
};
exports.convertUTCToDate = (date) => {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
};
exports.getCalendar = (date, chosen = null) => {
    let b = moment_1.default.utc(date);
    let f = moment_1.default.utc(date);
    const cMonth = f.month();
    const timeLine = [];
    let isChosenMonthYear = false;
    let chosenMonth = null;
    let chosenYear = null;
    let chosenDay = null;
    if (chosen) {
        let chosenDate = null;
        if (typeof chosen === 'string') {
            chosenDate = new Date(chosen);
        }
        else if (chosen instanceof Date) {
            chosenDate = chosen;
        }
        if (chosenDate) {
            chosenMonth = chosenDate.getUTCMonth();
            chosenYear = chosenDate.getUTCFullYear();
            chosenDay = chosenDate.getUTCDate();
            isChosenMonthYear =
                b.month() === chosenMonth && b.year() === chosenYear;
        }
    }
    let i = 0;
    let pad = 1;
    let decreasePad = false;
    while (i < 50) {
        b = b.add(-1, 'day');
        if (cMonth !== b.month() && !decreasePad) {
            pad = b.day();
            decreasePad = true;
        }
        if (pad <= 0) {
            break;
        }
        timeLine.unshift({
            key: `${b.date()}-${b.month()}-${b.year()}`,
            weekDay: b.day(),
            day: b.date(),
            month: b.month(),
            year: b.year(),
            selected: !decreasePad && isChosenMonthYear && b.date() === chosenDay,
            currentMonth: b.year() === chosenYear && b.month() === chosenMonth,
        });
        if (decreasePad) {
            pad -= 1;
        }
        i += 1;
    }
    i = 0;
    pad = 1;
    decreasePad = false;
    while (i < 50) {
        timeLine.push({
            key: `${f.date()}-${f.month()}-${f.year()}`,
            weekDay: f.day(),
            day: f.date(),
            month: f.month(),
            year: f.year(),
            selected: !decreasePad && isChosenMonthYear && f.date() === chosenDay,
            currentMonth: f.year() === chosenYear && f.month() === chosenMonth,
        });
        f = f.add(1, 'day');
        if (cMonth !== f.month() && !decreasePad) {
            pad = 42 - timeLine.length;
            decreasePad = true;
        }
        if (pad <= 0) {
            break;
        }
        if (decreasePad) {
            pad -= 1;
        }
        i += 1;
    }
    const byWeeks = [];
    let cWeek = [];
    timeLine.forEach(day => {
        if (day.weekDay === 1 && cWeek.length) {
            byWeeks.push(cWeek);
            cWeek = [];
        }
        cWeek.push(day);
    });
    if (cWeek.length) {
        byWeeks.push(cWeek);
    }
    return {
        cMonth,
        grid: byWeeks,
    };
};
//# sourceMappingURL=date.js.map