/**
 * 用户信息模型
 *
 * @author biu
 * @date 2018/6/28
 */

'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    phone: {
      type: STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    pwd_key: {
      type: STRING,
      allowNull: false,
    },
    token: STRING,
    token_expires_in: DATE,
    nickname: STRING(30),
    birthday: DATE,
    avatar: STRING,
  });

  User.findByPhone = function(phone) {
    return this.findOne({
      where: {
        phone,
      },
    });
  };

  User.getProfile = async function(userId) {
    const user = await this.findById(userId, {
      attributes: [
        'id',
        'nickname',
        'phone',
        'avatar',
        'birthday',
      ],
    });
    return user.toJSON();
  };

  return User;
};
