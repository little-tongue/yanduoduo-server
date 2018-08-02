/**
 * 扩展 helper 对象，提供工具方法
 *
 * @author biu
 * @date 2018/6/28
 */

'use strict';

const crypto = require('crypto');
const uuidv4 = require('uuid/v4');
const shortid = require('shortid');

// 用户名前缀
const USER_NAME_PREFIX = 'YDD_';

module.exports = {
  /**
   * 随机生成指定区间内的一个数字，含最小值和最大值
   *
   * @param {number} min - 最小值
   * @param {number} max - 最大值
   * @return {number} - 随机数字
   */
  randomNumber(min, max) {
    const rang = max - min;
    const r = Math.random();
    return min + Math.round(rang * r);
  },

  /**
   * 返回一个 Unix 时间戳，单位是 s
   *
   * @return {number} - Unix 时间戳
   */
  getUnixTimestamp() {
    return Math.floor(Date.now() / 1000);
  },

  /**
   * 随机生成指定长度的字符串，默认为 6 位
   * @param {number} [len] - 字符串长度
   * @return {string} - 随机字符串
   */
  randomString(len = 6) {
    const buf = [];
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
    const charLen = chars.length;

    for (let i = 0; i < len; i++) {
      buf.push(chars[this.randomNumber(0, charLen - 1)]);
    }
    return buf.join('');
  },

  /**
   * 对一段信息进行签名，签名算法为 sha1 ，输出为 16 进制数
   *
   * @param {string} content - 欲签名的内容
   * @param {string} key - 加密 key
   * @return {string} 返回签名后的密文
   */
  sign(content, key) {
    if (!content || !key) {
      throw new Error('信息或者加密 Key 不能为空');
    }
    const hmac = crypto.createHmac('sha1', key);

    hmac.update(content);
    return hmac.digest('hex');
  },

  /**
   * 随机生成加密 key，并用 key 生成加密后的密码
   *
   * @param {string} password - 原始密码
   * @return {[string,string]} - key 和 密码
   */
  secretPassword(password) {
    const secret = this.randomString(8);
    const signedPwd = this.sign(password, secret);
    return [secret, signedPwd];
  },

  /**
   * 获取 uuid
   *
   * @return {String} - 唯一 id
   */
  uuid() {
    return uuidv4();
  },

  /**
   * 根据有效时间获取过期时间点
   *
   * @param {number} [maxAge] - 有效时间，单位是秒
   * @return {number} - 过期时间点的 Unix 时间戳
   */
  getExpiresIn(maxAge) {
    return Date.now() + maxAge * 1000;
  },

  /**
   * 判断是否到了过期时间
   *
   * @param {string} date - 过期的时间点
   * @return {boolean} - 检查结果
   */
  isExpired(date) {
    return new Date() >= new Date(date);
  },

  /**
   * 随机生成用户名，用户名具有唯一性
   *
   * @return {string} - 用户名
   */
  generateUserName() {
    return USER_NAME_PREFIX + shortid.generate();
  },
};
