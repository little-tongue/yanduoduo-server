/**
 * 用户个人相册照片
 *
 * @author biu
 * @date 2018/8/1
 */

'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  return app.model.define('photo', {
    id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    url: STRING,
  });
};
