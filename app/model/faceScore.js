/**
 * 颜值榜
 *
 * @author biu
 * @date 2018/8/1
 */

'use strict';

module.exports = app => {
  const { FLOAT, INTEGER } = app.Sequelize;

  return app.model.define('faceScore', {
    id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    score: {
      type: FLOAT(3, 1),
    },
  }, {
    tableName: 'face_scores',
    createdAt: false,
    updatedAt: false,
  });
};
