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
    const { User, RefreshToken, FaceScore, Photo } = app.model;

    User.hasOne(RefreshToken, { onDelete: 'CASCADE' });
    User.hasOne(FaceScore, { onDelete: 'CASCADE' });
    User.hasMany(Photo, { onDelete: 'CASCADE' });

    // 用户关注信息表，following：关注者，followed：被关注者，
    User.belongsToMany(User, { as: 'follower', through: 'follows', foreignKey: 'following', otherKey: 'followed' });

    // 点赞关系表，liking：点赞者，liked：被点赞者
    User.belongsToMany(User, { as: 'liker', through: 'likes', foreignKey: 'liking', otherKey: 'liked' });

    await app.model.sync();
    app.logger.info('数据库模型同步结束');
  });
};
