/**
 * 错误码及信息
 *
 * @author biu
 * @date 2018/6/28
 */

'use strict';

module.exports = {
  invalidParam: {
    code: 'InvalidParam',
    message: '参数不合法',
  },
  serverError: {
    code: 'ServerError',
    message: '服务器错误',
  },
  phoneCode: {
    tooOften: {
      code: 'GetPhoneCodeTooOfter',
      message: '短时间内重复获取验证码',
    },
    fail: {
      code: 'SendCodeFail',
      message: '发送短信验证码失败',
    },
    errorCode: {
      code: 'PhoneCodeError',
      message: '验证码不正确',
    },
  },
  register: {
    registered: {
      code: 'PhoneRegistered',
      message: '该手机号已注册',
    },
  },
  login: {
    unRegistered: {
      code: 'UnRegistered',
      message: '该用户不存在',
    },
    passwordError: {
      code: 'PasswordError',
      message: '密码错误',
    },
  },
  token: {
    error: {
      code: 'InvalidToken',
      message: '无效的 token',
    },
    expired: {
      code: 'TokenExpired',
      message: 'token 已过期',
    },
  },
};
