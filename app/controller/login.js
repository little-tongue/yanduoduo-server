/**
 * 登录相关控制器
 *
 * @author biu
 * @date 2018/8/2
 */

'use strict';

const Controller = require('../core/base_controller');
const validateRules = require('../core/validate_rules');
const CustomError = require('../core/error/CustomError');

class LoginController extends Controller {
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

    const loginService = ctx.service.login;
    let user = await ctx.model.User.findByPhone(phone);
    if (code) {
      // 手机短信登录，检查验证码是否正确，不正确直接返回错误
      const isCodeCorrect = await ctx.service.common.checkPhoneCode(phone, code);
      if (!isCodeCorrect) {
        return this.fail(new CustomError(CustomError.TYPES.phoneCode.errorCode));
      }
      if (!user) {
        // 用户不存在则新建用户
        user = await ctx.service.user.createUser(phone);
      }
    } else if (password) {
      // 密码登录
      if (!user) {
        // 用户不存在，返回错误
        return this.fail(new CustomError(CustomError.TYPES.login.passwordError));
      }
      const isPwdCorrect = loginService.checkPassword(user, password);
      if (!isPwdCorrect) {
        // 用户存在，但密码错误，返回错误
        return this.fail(new CustomError(CustomError.TYPES.login.passwordError));
      }
    }

    const userId = user.id;
    const token = await loginService.generateToken(userId);
    this.success('登陆成功', token);
    logger.info('用户 %d 登陆成功', userId);
  }

  async loginByThirdParty() {
    const { ctx } = this;
    const { logger } = ctx;
    try {
      ctx.validate(validateRules.thirdLogin);
    } catch (err) {
      this.fail(new CustomError(CustomError.TYPES.invalidParam));
      logger.warn(err.errors);
      return;
    }

    const loginService = ctx.service.login;
    const { access_token, openid, type } = ctx.request.body;
    const info = await loginService.getThirdPartyUserInfo(access_token, openid, type);
    if (!info) {
      this.fail(new CustomError(CustomError.TYPES.login.thirdPartyLoginFail));
      return;
    }

    // 第三方登录校验成功
    const bindInfo = await ctx.model.OpenId.getBoundInfo(type, openid);
    if (bindInfo && bindInfo.user_id) {
      // 已经绑定了用户，认为登录成功
      const userId = bindInfo.user_id;
      const token = await loginService.generateToken(userId);
      this.success('登陆成功', token);
      logger.info('用户 %d 登陆成功，登录方式：%s', userId, type);
    } else {
      // 尚未绑定用户
      this.fail(new CustomError(CustomError.TYPES.login.unBound));
      logger.info('第三方登录失败，尚未绑定。type: ' + type);
    }
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
    const token = await ctx.service.login.generateToken(userId);
    this.success('刷新成功', token);
    logger.info('用户 %d 刷新 token 成功', userId);
  }

  async exitLogin() {
    const { ctx } = this;
    const { userId, logger } = ctx;
    await ctx.service.login.clearToken(userId);
    this.success('退出登录成功');

    logger.info('用户 %s 退出登录', userId);
  }
}

module.exports = LoginController;
