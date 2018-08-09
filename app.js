/**
 * 自定义启动过程
 *
 * @author biu
 * @date 2018/6/28
 */

'use strict';

module.exports = app => {
  app.beforeStart(async () => {
    app.logger.info('开始同步模型到数据库');
    const { User, RefreshToken, OpenId } = app.model;

    User.hasOne(RefreshToken);
    User.hasOne(OpenId);

    await app.model.sync();
    app.logger.info('数据库模型同步结束');
  });
};
