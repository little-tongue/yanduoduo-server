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
};
