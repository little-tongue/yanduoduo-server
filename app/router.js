'use strict';

const BASE_URL = '/v1';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { user: userController, login: loginController } = controller;
  const auth = app.middleware.auth;

  router.get(BASE_URL + '/smsCode', loginController.getPhoneCode); // 获取短信验证码
  router.post(BASE_URL + '/login', loginController.login); // 登陆
  router.get(BASE_URL + '/refreshToken', loginController.refreshToken); // 刷新 token
  router.get(BASE_URL + '/logout', auth, loginController.exitLogin); // 退出登录

  router.get(BASE_URL + '/userinfo', auth, userController.getUserInfo); // 获取用户信息
  router.post(BASE_URL + '/user/avatar', auth, userController.uploadAvatar); // 上传并修改头像
  router.post(BASE_URL + '/user/resetPassword', userController.resetPassword); // 重置密码
};
