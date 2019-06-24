/* eslint-disable no-console */
class Logger {
  
  static error = (msg: string, err: Error) => {
    console.error(`${msg}. ${(err || '')}. ${err && (err.stack || '')}`);
  };

  static info = (msg: string) => {
    console.log(msg);
  };

}

export default Logger;