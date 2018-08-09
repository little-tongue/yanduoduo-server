/**
 * 登录相关服务
 *
 * @author biu
 * @date 2018/8/9
 */

'use strict';

const Service = require('egg').Service;

const CustomError = require('../core/error/CustomError');

class LoginService extends Service {
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
}

module.exports = LoginService;
