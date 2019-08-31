/* eslint-disable no-console */
export const debug = message => {
  console.log(JSON.stringify({
    level: 'DEBUG',
    message
  }));
};
export const info = message => {
  console.log(JSON.stringify({
    level: 'INFO',
    message
  }));
};
export const warn = message => {
  console.log(JSON.stringify({
    level: 'WARNING',
    message
  }));
};
export const error = (message, messageError) => {
  let reportedError = messageError;

  if (messageError instanceof Error) {
    let st = messageError.stack.split('\n');
    st.shift();
    st = st.map(level => level.replace('    at ', ''));
    reportedError = {
      message: messageError.message,
      // ;)))
      stack: st.join(' <-- ')
    };
  }

  console.log(JSON.stringify({
    level: 'ERROR',
    message,
    error: reportedError
  }));
};