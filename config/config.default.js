'use strict';

const path = require('path');
const secret = require('./secret');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + secret.cookieSignKey;

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

  config.sequelize = {
    dialect: 'mysql',
    host: '39.105.57.95',
    port: 3306,
    database: 'yanduoduotest',
    username: secret.mysql.username,
    password: secret.mysql.password,
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.token = {
    accessAge: 60 * 60 * 2,
    refreshAge: 60 * 60 * 24 * 30,
  };

  config.upload = {
    imageDir: path.resolve(__dirname, '../app/public/uploads/avatar'),
    avatarWidth: 650,
  };

  return config;
};
