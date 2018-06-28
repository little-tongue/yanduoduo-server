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
}

module.exports = UserService;
