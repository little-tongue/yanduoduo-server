'use strict';

const BASE_URL = '/v1';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { user, login, common } = controller;
  const auth = app.middleware.auth;

  router.get(BASE_URL + '/smsCode', common.getPhoneCode); // 获取短信验证码

  router.post(BASE_URL + '/login', login.login); // 登陆
  router.post(BASE_URL + '/login/third_party', login.loginByThirdParty); // 第三方登陆
  router.get(BASE_URL + '/refreshToken', login.refreshToken); // 刷新 token
  router.get(BASE_URL + '/logout', auth, login.exitLogin); // 退出登录

  router.get(BASE_URL + '/userinfo', auth, user.getUserInfo); // 获取用户信息
  router.post(BASE_URL + '/user/avatar', auth, user.uploadAvatar); // 上传并修改头像
  router.post(BASE_URL + '/user/resetPassword', user.resetPassword); // 重置密码
};
