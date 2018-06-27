'use strict';

const BASE_URL = '/api/v1';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { user: userController } = controller;

  router.get(BASE_URL + '/smsCode', userController.getPhoneCode); // 获取短信验证码
  router.post(BASE_URL + '/register', userController.register); // 注册
  router.post(BASE_URL + '/login', userController.login); // 登陆
  router.post(BASE_URL + '/resetPassword', userController.resetPassword); // 重置密码
  router.get(BASE_URL + '/refresh_token', userController.refreshToken); // 刷新 token
  router.get(BASE_URL + '/profile', userController.getProfile); // 获取用户信息
  router.post(BASE_URL + '/avatar', userController.uploadAvatar); // 上传并修改头像
  router.get(BASE_URL + '/logout', userController.exitLogin); // 退出登录
};
