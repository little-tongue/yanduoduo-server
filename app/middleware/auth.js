/**
 * 鉴权中间件，从请求信息中获取 token 并验证，同时根据 token 获取发起请求的用户 id
 *
 * @author biu
 * @date 2018/6/28
 */

'use strict';

const types = require('../core/error/types');

module.exports = async (ctx, next) => {
  const token = ctx.get('authorization')
    || ctx.request.body && ctx.request.body.access_token
    || ctx.query && ctx.query.access_token;

  const userId = await ctx.service.user.getUserIdByToken(token);
  if (userId) {
    ctx.userId = parseInt(userId); // redis 中读取到的是字符串，这里转换成整型
    await next();
  } else {
    const type = types.token.error;
    ctx.body = {
      status: 'fail',
      err_code: type.code,
      message: type.message,
    };
  }
};
