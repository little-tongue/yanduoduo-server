/**
 * 第三方登录 openId
 *
 * @author biu
 * @date 2018/8/9
 */

'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const OpenId = app.model.define('openId', {
    id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    wechat: STRING,
    qq: STRING,
    sina: STRING,
  }, {
    tableName: 'openids',
  });

  OpenId.getBoundInfo = function(type, openid) {
    return this.findOne({
      where: {
        [type]: openid,
      },
    });
  };

  return OpenId;
};
