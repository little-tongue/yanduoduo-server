'use strict';

const Controller = require('../core/base_controller');
const validateRules = require('../core/validate_rules');
const CustomError = require('../core/error/CustomError');
const toArray = require('stream-to-array');
const sendToWormhole = require('stream-wormhole');

class UserController extends Controller {
  async getUserInfo() {
    const { ctx } = this;

    const profile = await ctx.model.User.getUserInfo(ctx.userId);
    this.success('成功获取用户信息', profile);
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
}

module.exports = UserController;
