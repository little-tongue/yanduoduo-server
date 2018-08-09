/**
 * 通用服务
 *
 * @author biu
 * @date 2018/8/9
 */

'use strict';

const Service = require('egg').Service;

const CustomError = require('../core/error/CustomError');

class CommonService extends Service {
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

    const code = helper.generateCode();
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
}

module.exports = CommonService;
