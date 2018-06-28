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
    // TODO
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
