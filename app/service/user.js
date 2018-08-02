/**
 * user 服务
 *
 * @author biu
 * @date 2018/6/27
 */

'use strict';

const Service = require('egg').Service;
const CustomError = require('../core/error/CustomError');
const Sharp = require('sharp');
const path = require('path');
const mkdirp = require('mkdirp');

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

  /**
   * 新建用户
   *
   * @param {string} phone - 用户手机号
   * @return {Promise<object>} - object 为用户模型实例
   */
  async createUser(phone) {
    const { ctx } = this;
    const { helper, logger } = ctx;

    const name = helper.generateUserName();
    const user = await ctx.model.User.create({
      name,
      phone,
    });
    logger.info(`成功创建新用户，id：${user.id} name:${user.name}`);
    return user;
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

  /**
   * 生成用户登录后的 token
   *
   * @param {number} userId - 用户 id
   * @return {Promise<{}>} - 返回 Promise 对象，包含 token 信息
   */
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

    await ctx.model.RefreshToken.setToken(userId, {
      token: refreshToken,
      token_expires_in: helper.getExpiresIn(refreshAge),
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

  async clearToken(userId) {
    const { ctx, app } = this;
    const { logger } = ctx;
    const { redis } = app;

    const token = ctx.get('authorization');
    await redis.del('token_' + userId);
    await redis.del(token);

    await ctx.model.RefreshToken.destroy({
      where: {
        user_id: userId,
      },
    });

    logger.info('清除用户 token 缓存，用户 ID：', userId);
  }

  saveAvatar(buffer, userId) {
    const { app, ctx } = this;
    const { helper } = ctx;
    const { avatarWidth, imageDir } = app.config.upload;

    mkdirp.sync(imageDir); // 如果图片目录不存在，则创建
    const fileName = `u_${userId}_${helper.randomString(8)}.jpeg`;
    const filePath = path.join(imageDir, fileName);

    return Sharp(buffer)
      .resize(avatarWidth, avatarWidth)
      .ignoreAspectRatio()
      .jpeg({
        chromaSubsampling: '4:4:4',
      })
      .toFile(filePath)
      .then(info => {
        info.fileName = fileName;
        return info;
      });
  }
}

module.exports = UserService;
