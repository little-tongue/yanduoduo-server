/**
 * refreshToken 信息
 *
 * @author biu
 * @date 2018/8/1
 */

'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  return app.model.define('refreshToken', {
    id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    token: STRING,
    token_expires_in: DATE,
  });
};
