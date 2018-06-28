/**
 * 生产环境配置
 *
 * @author biu
 * @date 2018/6/27
 */

'use strict';

module.exports = {
  redis: {
    db: 1, // 生产环境下使用 db1
  },
  sequelize: {
    database: 'yanduoduo',
  },
};
