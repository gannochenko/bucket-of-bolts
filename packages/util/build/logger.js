"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logDebug = function (message) {
    console.log(JSON.stringify({ level: 'DEBUG', message: message }));
};
exports.logInfo = function (message) {
    console.log(JSON.stringify({ level: 'INFO', message: message }));
};
exports.logWarning = function (message) {
    console.log(JSON.stringify({ level: 'WARNING', message: message }));
};
exports.logError = function (message, messageError) {
    if (messageError === void 0) { messageError = null; }
    var details = '';
    if (messageError instanceof Error) {
        if (messageError.stack) {
            var stack = messageError.stack.split('\n');
            stack.shift();
            stack = stack.map(function (level) { return level.replace('    at ', ''); });
            details = stack.join('; ');
        }
        if (messageError.message) {
            message = message + ": " + messageError.message;
        }
    }
    console.log(JSON.stringify({ level: 'ERROR', message: message, details: details }));
};
//# sourceMappingURL=logger.js.map