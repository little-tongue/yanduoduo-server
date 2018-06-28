/**
 * 错误对象
 *
 * @author biu
 * @date 2018/6/28
 */

'use strict';

class CustomError extends Error {
  constructor({ code, message }) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.message = message;
    this.code = code;
  }
}

CustomError.TYPES = require('./types');

module.exports = CustomError;
