/* eslint-disable no-console */

type Nullable<T> = T | null;

export const logDebug = (message: string) => {
    console.log(JSON.stringify({ level: 'DEBUG', message }));
};

export const logInfo = (message: string) => {
    console.log(JSON.stringify({ level: 'INFO', message }));
};

export const logWarning = (message: string) => {
    console.log(JSON.stringify({ level: 'WARNING', message }));
};

export const logError = (
    message: string,
    messageError: Nullable<Error> = null,
) => {
    let details = '';
    if (messageError instanceof Error && messageError.stack) {
        let stack = messageError.stack.split('\n');
        stack.shift();
        stack = stack.map(level => level.replace('    at ', ''));

        details = stack.join('; ');
    }

    console.log(JSON.stringify({ level: 'ERROR', message, details }));
};
