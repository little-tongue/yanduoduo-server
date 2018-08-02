'use strict';

const BASE_URL = '/v1';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { user: userController } = controller;
  const auth = app.middleware.auth;

  router.get(BASE_URL + '/smsCode', userController.getPhoneCode); // 获取短信验证码
  router.post(BASE_URL + '/login', userController.login); // 登陆
  router.post(BASE_URL + '/resetPassword', userController.resetPassword); // 重置密码
  router.get(BASE_URL + '/refreshToken', userController.refreshToken); // 刷新 token
  router.get(BASE_URL + '/profile', auth, userController.getProfile); // 获取用户信息
  router.post(BASE_URL + '/avatar', auth, userController.uploadAvatar); // 上传并修改头像
  router.get(BASE_URL + '/logout', auth, userController.exitLogin); // 退出登录
};
