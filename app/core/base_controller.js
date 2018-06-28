/**
 * 控制器基类
 *
 * @author biu
 * @date 2018/6/27
 */

'use strict';

const Controller = require('egg').Controller;

class Base_controller extends Controller {
  /**
   * 请求成功
   *
   * @param {string} [message] - 提示文字
   * @param {object} [data] - 数据
   */
  success(message, data) {
    this.ctx.body = {
      status: 'success',
      message: message || '成功',
      data,
    };
  }

  /**
   * 请求失败
   *
   * @param {CustomError} err - 错误对象
   * @param {object} [data] - 数据
   */
  fail(err, data) {
    this.ctx.body = {
      status: 'fail',
      err_code: err.code,
      message: err.message,
      data,
    };
  }
}

module.exports = Base_controller;
