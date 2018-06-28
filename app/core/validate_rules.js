/**
 * 参数校验规则
 *
 * @author biu
 * @date 2018/6/27
 */

'use strict';

const phone = {
  type: 'string',
  format: /^1[3456789]\d{9}$/,
};

module.exports = {
  phone,
};
