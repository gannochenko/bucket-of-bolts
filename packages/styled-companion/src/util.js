/**
 * Converts a numeric value into int
 * @param val
 * @returns {number}
 */
const pInt = val => {
    let iVal = parseInt(val, 10);
    if (isNaN(iVal)) {
        iVal = 0;
    }

    return iVal;
};

/**
 * Performs an operation on val by applying a function
 * @param val
 * @param fn
 * @returns {*}
 */
export const op = (val, fn) => {
    if (typeof val === 'undefined') {
        return val;
    }

    const f = val
        .toString()
        .trim()
        .match(/^(\d+)?(.(\d+))?(px|rem|em)?$/i);
    if (f.length) {
        const full = pInt(f[1]);
        const frac = pInt(f[3]);
        const unit = f[4] || '';

        return `${fn(full + +`0.${frac}`)}${unit}`;
    }

    return val;
};
