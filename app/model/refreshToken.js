/**
 * refreshToken 信息
 *
 * @author biu
 * @date 2018/8/1
 */

'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const RefreshToken = app.model.define('refreshToken', {
    id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    token: STRING,
    token_expires_in: DATE,
  }, {
    tableName: 'refresh_tokens',
    createdAt: false,
    updatedAt: false,
  });

  RefreshToken.setToken = function(userId, data) {
    return this.findOrCreate({
      where: {
        user_id: userId,
      },
      defaults: {
        user_id: userId,
      },
    })
      .spread(record => {
        for (const key in data) {
          record[key] = data[key];
        }
        return record.save();
      });
  };

  return RefreshToken;
};
