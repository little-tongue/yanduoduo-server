'use strict';

const Controller = require('../core/base_controller');
const validateRules = require('../core/validate_rules');
const CustomError = require('../core/error/CustomError');

class UserController extends Controller {
  async getPhoneCode() {
    const { ctx } = this;
    const { logger } = ctx;

    try {
      ctx.validate({
        phone: validateRules.phone,
      }, ctx.query);
    } catch (err) {
      logger.info(err.errors);
      return this.fail(new CustomError(CustomError.TYPES.invalidParam));
    }

    try {
      await ctx.service.user.sendPhoneCode(ctx.query.phone);
      this.success();
      logger.info('成功发送验证码');
    } catch (err) {
      logger.warn(err);
      this.fail(err);
    }
  }

  async register() {
    const { ctx } = this;
    const { logger } = ctx;

    try {
      ctx.validate(validateRules.registerForm);
    } catch (err) {
      logger.info(err.errors);
      return this.fail(new CustomError(CustomError.TYPES.invalidParam));
    }
    const { phone, code, password, rePassword } = ctx.request.body;
    if (password !== rePassword) {
      return this.fail(new CustomError(CustomError.TYPES.invalidParam));
    }
    const userService = ctx.service.user;
    const isCodeCorrect = await userService.checkPhoneCode(phone, code);
    if (!isCodeCorrect) {
      return this.fail(new CustomError(CustomError.TYPES.phoneCode.errorCode));
    }
    let user = await ctx.model.User.findByPhone(phone);
    if (user) {
      return this.fail(new CustomError(CustomError.TYPES.register.registered));
    }
    // 新建用户
    user = await userService.createUser(phone, password);
    this.success('创建用户成功', {
      id: user.id,
      nickname: user.nickname,
    });
    logger.info('用户 %s 创建成功，id 为 %d', user.nickname, user.id);
  }

  async login() {
    // TODO
  }

  async resetPassword() {
    // TODO
  }

  async refreshToken() {
    // TODO
  }

  async getProfile() {
    // TODO
  }

  async uploadAvatar() {
    // TODO
  }

  async exitLogin() {
    // TODO
  }
}

module.exports = UserController;
