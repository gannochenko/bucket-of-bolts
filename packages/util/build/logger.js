'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.error = exports.warn = exports.info = exports.debug = void 0;

/* eslint-disable no-console */
var debug = function debug(message) {
    console.log(
        JSON.stringify({
            level: 'DEBUG',
            message: message,
        }),
    );
};

exports.debug = debug;

var info = function info(message) {
    console.log(
        JSON.stringify({
            level: 'INFO',
            message: message,
        }),
    );
};

exports.info = info;

var warn = function warn(message) {
    console.log(
        JSON.stringify({
            level: 'WARNING',
            message: message,
        }),
    );
};

exports.warn = warn;

var error = function error(message, messageError) {
    var reportedError = messageError;

    if (messageError instanceof Error) {
        var st = messageError.stack.split('\n');
        st.shift();
        st = st.map(function(level) {
            return level.replace('    at ', '');
        });
        reportedError = {
            message: messageError.message,
            // ;)))
            stack: st.join(' <-- '),
        };
    }

    console.log(
        JSON.stringify({
            level: 'ERROR',
            message: message,
            error: reportedError,
        }),
    );
};

exports.error = error;
