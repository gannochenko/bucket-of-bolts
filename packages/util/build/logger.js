"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logDebug = (message) => {
    console.log(JSON.stringify({ level: 'DEBUG', message }));
};
exports.logInfo = (message) => {
    console.log(JSON.stringify({ level: 'INFO', message }));
};
exports.logWarning = (message) => {
    console.log(JSON.stringify({ level: 'WARNING', message }));
};
exports.logError = (message, messageError = null) => {
    let details = '';
    if (messageError instanceof Error) {
        if (messageError.stack) {
            let stack = messageError.stack.split('\n');
            stack.shift();
            stack = stack.map(level => level.replace('    at ', ''));
            details = stack.join('; ');
        }
        if (messageError.message) {
            message = `${message}: ${messageError.message}`;
        }
    }
    console.log(JSON.stringify({ level: 'ERROR', message, details }));
};
//# sourceMappingURL=logger.js.map