"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
exports.convertLocalDateToUTC = function (date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
};
exports.convertUTCToDate = function (date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
};
exports.getCalendar = function (date, chosen) {
    if (chosen === void 0) { chosen = null; }
    var b = moment_1.default.utc(date);
    var f = moment_1.default.utc(date);
    var cMonth = f.month();
    var timeLine = [];
    var isChosenMonthYear = false;
    var chosenMonth = null;
    var chosenYear = null;
    var chosenDay = null;
    if (chosen) {
        var chosenDate = null;
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
    var i = 0;
    var pad = 1;
    var decreasePad = false;
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
            key: b.date() + "-" + b.month() + "-" + b.year(),
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
            key: f.date() + "-" + f.month() + "-" + f.year(),
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
    var byWeeks = [];
    var cWeek = [];
    timeLine.forEach(function (day) {
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
        cMonth: cMonth,
        grid: byWeeks,
    };
};
//# sourceMappingURL=date.js.map