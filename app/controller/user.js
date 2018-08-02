'use strict';

const Controller = require('../core/base_controller');
const validateRules = require('../core/validate_rules');
const CustomError = require('../core/error/CustomError');
const toArray = require('stream-to-array');
const sendToWormhole = require('stream-wormhole');

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

  async login() {
    const { ctx } = this;
    const { logger } = ctx;
    try {
      ctx.validate(validateRules.loginForm);
    } catch (err) {
      this.fail(new CustomError(CustomError.TYPES.invalidParam));
      logger.warn(err.errors);
      return;
    }
    const { phone, code, password } = ctx.request.body;
    if (!code && !password) {
      return this.fail(new CustomError(CustomError.TYPES.invalidParam));
    }

    const userService = ctx.service.user;
    let user = await ctx.model.User.findByPhone(phone);
    if (code) {
      // 手机短信登录，检查验证码是否正确，不正确直接返回错误
      const isCodeCorrect = await ctx.service.user.checkPhoneCode(phone, code);
      if (!isCodeCorrect) {
        return this.fail(new CustomError(CustomError.TYPES.phoneCode.errorCode));
      }
      if (!user) {
        // 用户不存在则新建用户
        user = await userService.createUser(phone);
      }
    } else if (password) {
      // 密码登录
      if (!user) {
        // 用户不存在，返回错误
        return this.fail(new CustomError(CustomError.TYPES.login.passwordError));
      }
      const isPwdCorrect = userService.checkPassword(user, password);
      if (!isPwdCorrect) {
        // 用户存在，但密码错误，返回错误
        return this.fail(new CustomError(CustomError.TYPES.login.passwordError));
      }
    }

    const userId = user.id;
    const token = await userService.generateToken(userId);
    this.success('登陆成功', token);
    logger.info('用户 %d 登陆成功', userId);
  }

  async resetPassword() {
    const { ctx } = this;
    const { logger, helper } = ctx;

    try {
      ctx.validate(validateRules.resetPwdForm);
    } catch (err) {
      logger.info(err.errors);
      return this.fail(new CustomError(CustomError.TYPES.invalidParam));
    }

    const { phone, code, password } = ctx.request.body;
    const user = await ctx.model.User.findByPhone(phone);
    if (!user) {
      return this.fail(new CustomError(CustomError.TYPES.login.unRegistered));
    }
    const isCodeCorrect = await ctx.service.user.checkPhoneCode(phone, code);
    if (!isCodeCorrect) {
      return this.fail(new CustomError(CustomError.TYPES.phoneCode.errorCode));
    }
    const [secret, signedPwd] = helper.secretPassword(password);
    user.pwd_key = secret;
    user.password = signedPwd;
    await user.save();
    this.success();
    logger.info('用户 %d 修改密码', user.id);
  }

  async refreshToken() {
    const { ctx } = this;
    const { logger, helper } = ctx;

    const refreshToken = ctx.query && ctx.query.token;
    if (!refreshToken) {
      return this.fail(new CustomError(CustomError.TYPES.token.error));
    }

    logger.info('刷新 token');
    const tokenRecord = await ctx.model.RefreshToken.findOne({
      where: {
        token: refreshToken,
      },
    });
    if (!tokenRecord) {
      return this.fail(new CustomError(CustomError.TYPES.token.error));
    }
    if (helper.isExpired(tokenRecord.token_expires_in)) {
      return this.fail(new CustomError(CustomError.TYPES.token.expired));
    }

    const userId = tokenRecord.user_id;
    const token = await ctx.service.user.generateToken(userId);
    this.success('刷新成功', token);
    logger.info('用户 %d 刷新 token 成功', userId);
  }

  async getProfile() {
    const { ctx } = this;

    const profile = await ctx.model.User.getProfile(ctx.userId);
    this.success('成功获取用户信息', profile);
  }

  async uploadAvatar() {
    const { ctx } = this;
    const { logger } = ctx;
    const userId = ctx.userId;

    logger.info('用户 %d 上传头像', userId);

    let stream;
    try {
      stream = await ctx.getFileStream();
    } catch (err) {
      return this.fail(new CustomError({
        code: CustomError.TYPES.uploadError.code,
        message: err.message,
      }));
    }

    let fileName;
    try {
      const parts = await toArray(stream);
      const buf = Buffer.concat(parts);
      const info = await ctx.service.user.saveAvatar(buf, userId);
      fileName = info.fileName;
      logger.info('成功保存图片，图片名称为：%s', fileName);
    } catch (err) {
      await sendToWormhole(stream);
      this.fail(new CustomError(CustomError.TYPES.uploadError));
      logger.error(err);
    }

    const avatarUrl = `/public/uploads/avatar/${fileName}`;

    await ctx.model.User.update({
      avatar: avatarUrl,
    }, {
      where: {
        id: userId,
      },
    });
    this.success('修改成功', {
      url: avatarUrl,
    });
    logger.info('修改头像成功');
  }

  async exitLogin() {
    const { ctx } = this;
    const { userId, logger } = ctx;
    await ctx.service.user.clearToken(userId);
    this.success('退出登录成功');

    logger.info('用户 %s 退出登录', userId);
  }
}

module.exports = UserController;
