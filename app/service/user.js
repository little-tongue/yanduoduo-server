/**
 * user 服务
 *
 * @author biu
 * @date 2018/6/27
 */

'use strict';

const Service = require('egg').Service;
const CustomError = require('../core/error/CustomError');

class UserService extends Service {
  /**
   * 产生随机验证码
   *
   * @param {number} [len] - 验证码长度，默认为 6 位
   * @return {string} - 验证码
   */
  static generateCode(len = 6) {
    let code = '';
    for (let i = 0; i < len; i++) {
      code += Math.floor(Math.random() * 10);
    }
    return code;
  }

  async sendPhoneCode(phone) {
    const { app, ctx } = this;
    const { helper, logger } = ctx;
    const { redis, config } = app;

    const key = phone + '_code';
    let codeCache = await redis.hgetall(key);
    if (codeCache && (helper.getUnixTimestamp() - codeCache.createAt) <
      config.phoneCode.interval) {
      // 短时间内重复获取
      throw new CustomError(CustomError.TYPES.phoneCode.tooOften);
    }

    const code = UserService.generateCode();
    const sendRes = await ctx.service.sms.sendPhoneCode(phone, code);
    if (sendRes && sendRes.Code === 'OK') {
      codeCache = codeCache || {};
      codeCache.createAt = helper.getUnixTimestamp();
      codeCache.code = code;

      // 将验证码信息写入 redis
      const pipeline = redis.pipeline();
      pipeline.hmset(key, codeCache);
      pipeline.expire(key, config.phoneCode.maxAge);
      try {
        await pipeline.exec();
      } catch (e) {
        logger.error(e);
        throw new CustomError(CustomError.TYPES.phoneCode.fail);
      }
    } else {
      throw new CustomError(CustomError.TYPES.phoneCode.fail);
    }
  }

  /**
   * 检查手机验证码是否正确
   *
   * @param {string} phoneNum - 手机号
   * @param {string} code - 验证码
   * @return {Promise<boolean>} 检查结果
   */
  async checkPhoneCode(phoneNum, code) {
    const { app } = this;
    const { redis } = app;

    const key = phoneNum + '_code';
    const cacheCode = await redis.hget(key, 'code');
    if (cacheCode === code) {
      await redis.del(key);
      return true;
    }
    return false;
  }

  async createUser(phone, password) {
    const { ctx } = this;
    const { helper, logger } = ctx;

    const nickname = helper.randomString(8);
    const [secret, signedPwd] = helper.secretPassword(password);

    logger.info('开始向数据库写入新用户信息');
    return await ctx.model.User.create({
      nickname,
      phone,
      password: signedPwd,
      pwd_key: secret,
    });
  }

  /**
   * 检查密码是否正确
   *
   * @param {object} user - 用户 Model 实例
   * @param {string} password - 密码
   * @return {boolean} 正确返回 true，错误返回 false
   */
  checkPassword(user, password) {
    return this.ctx.helper.sign(password, user.pwd_key) === user.password;
  }

  async generateToken(userId) {
    const { ctx, app } = this;
    const { helper, logger } = ctx;
    const { redis, config } = app;

    logger.info('生成token，userId: %d', userId);

    const accessToken = helper.uuid();
    const refreshToken = helper.uuid();

    // 获取之前未过期的 access_token
    const userTokenKey = 'token_' + userId;
    const oldToken = await redis.get(userTokenKey);

    const pipeline = redis.pipeline();
    const { accessAge, refreshAge } = config.token;
    if (oldToken) {
      pipeline.del(oldToken); // 删除未过期的 access_token
    }
    pipeline.set(accessToken, userId);
    pipeline.set(userTokenKey, accessToken);
    pipeline.expire(accessToken, accessAge);
    pipeline.expire(userTokenKey, accessAge);
    try {
      await pipeline.exec();
    } catch (e) {
      logger.error(e);
      throw new CustomError(CustomError.TYPES.serverError);
    }

    await ctx.model.User.update({
      token: refreshToken,
      token_expires_in: helper.getExpiresIn(refreshAge),
    }, {
      where: {
        id: userId,
      },
    });

    logger.info('成功生成 token');
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: accessAge,
    };
  }

  getUserIdByToken(token) {
    return this.app.redis.get(token);
  }
}

module.exports = UserService;
