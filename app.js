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
    await app.model.sync();
    app.logger.info('数据库模型同步结束');
  });
};
