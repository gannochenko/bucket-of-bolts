"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debug = function (message) {
    console.log(JSON.stringify({ level: 'DEBUG', message: message }));
};
exports.info = function (message) {
    console.log(JSON.stringify({ level: 'INFO', message: message }));
};
exports.warn = function (message) {
    console.log(JSON.stringify({ level: 'WARNING', message: message }));
};
exports.error = function (message, messageError) {
    if (messageError === void 0) { messageError = null; }
    var details = '';
    if (messageError instanceof Error && messageError.stack) {
        var stack = messageError.stack.split('\n');
        stack.shift();
        stack = stack.map(function (level) { return level.replace('    at ', ''); });
        details = stack.join('; ');
    }
    console.log(JSON.stringify({ level: 'ERROR', message: message, details: details }));
};
//# sourceMappingURL=logger.js.map