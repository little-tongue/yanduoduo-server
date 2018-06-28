/**
 * 扩展 helper 对象，提供工具方法
 *
 * @author biu
 * @date 2018/6/28
 */

'use strict';

module.exports = {
  /**
   * 返回一个 Unix 时间戳，单位是 s
   *
   * @return {number} - Unix 时间戳
   */
  getUnixTimestamp() {
    return Math.floor(Date.now() / 1000);
  },
};
