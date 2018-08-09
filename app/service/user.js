/**
 * user 服务
 *
 * @author biu
 * @date 2018/6/27
 */

'use strict';

const Service = require('egg').Service;
const Sharp = require('sharp');
const path = require('path');
const mkdirp = require('mkdirp');

class UserService extends Service {
  /**
   * 新建用户
   *
   * @param {string} phone - 用户手机号
   * @return {Promise<object>} - object 为用户模型实例
   */
  async createUser(phone) {
    const { ctx } = this;
    const { helper, logger } = ctx;

    const name = helper.generateUserName();
    const user = await ctx.model.User.create({
      name,
      phone,
    });
    logger.info(`成功创建新用户，id：${user.id} name:${user.name}`);
    return user;
  }

  saveAvatar(buffer, userId) {
    const { app, ctx } = this;
    const { helper } = ctx;
    const { avatarWidth, imageDir } = app.config.upload;

    mkdirp.sync(imageDir); // 如果图片目录不存在，则创建
    const fileName = `u_${userId}_${helper.randomString(8)}.jpeg`;
    const filePath = path.join(imageDir, fileName);

    return Sharp(buffer)
      .resize(avatarWidth, avatarWidth)
      .ignoreAspectRatio()
      .jpeg({
        chromaSubsampling: '4:4:4',
      })
      .toFile(filePath)
      .then(info => {
        info.fileName = fileName;
        return info;
      });
  }
}

module.exports = UserService;
