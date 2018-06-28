'use strict';

const secret = require('./secret');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1529993397580_8972';

  // add your config here
  config.middleware = [];

  config.redis = {
    client: {
      port: 6379,
      host: '39.105.57.95',
      password: secret.redisPwd,
      db: 0, // 默认(开发环境)使用 db0
    },
  };

  config.phoneCode = {
    interval: 60, // 60s内不允许重复获取
    maxAge: 60 * 15, // 验证码有效期为 15 分钟
  };

  config.sms = {
    accessKeyId: secret.aliYun.accessKeyId,
    secretAccessKey: secret.aliYun.secretAccessKey,
    signName: '颜多多',
    templateCode: 'SMS_138076461',
  };

  return config;
};
