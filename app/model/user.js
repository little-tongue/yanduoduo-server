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
    name: {
      type: STRING,
      unique: true,
      allowNull: false,
    },
    phone: {
      type: STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: STRING,
    },
    pwd_key: {
      type: STRING,
    },
    birthday: DATE,
    sex: INTEGER(1),
    city: INTEGER,
    school: INTEGER,
    profile: STRING,
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
        'name',
        'phone',
        'birthday',
        'sex',
        'city',
        'school',
        'profile',
        'avatar',
      ],
    });
    return user.toJSON();
  };

  return User;
};
