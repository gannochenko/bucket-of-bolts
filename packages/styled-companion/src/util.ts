type Nullable<T> = T | null;
type Scalar = string | number;

/**
 * Converts a numeric value into int
 */
export const pInt = (val: Nullable<Scalar>) => {
    let iVal = 0;
    if (typeof val === 'string') {
        iVal = parseInt(val, 10);
        if (Number.isNaN(iVal)) {
            iVal = 0;
        }
    } else if (typeof val !== 'undefined' && val !== null) {
        iVal = val;
    }

    return iVal;
};

/**
 * Performs an operation on val by applying a function
 */
export const op = (val: Nullable<Scalar>, fn: (arg: number) => number) => {
    if (typeof val === 'undefined' || val === null) {
        return val;
    }

    const results = val
        .toString()
        .trim()
        .match(/^(\d+)?(.(\d+))?(px|rem|em)?$/i);
    if (results && results.length) {
        const full = pInt(results[1]);
        const frac = pInt(results[3]);
        const unit = results[4] || '';

        return `${fn(full + +`0.${frac}`)}${unit}`;
    }

    return val.toString();
};
