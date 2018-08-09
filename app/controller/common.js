/**
 * 通用模块接口控制器
 *
 * @author biu
 * @date 2018/8/9
 */

'use strict';

const Controller = require('../core/base_controller');
const validateRules = require('../core/validate_rules');
const CustomError = require('../core/error/CustomError');

class CommonController extends Controller {
  async getPhoneCode() {
    const { ctx } = this;
    const { logger } = ctx;

    try {
      ctx.validate({
        phone: validateRules.phone,
      }, ctx.query);
    } catch (err) {
      logger.info(err.errors);
      return this.fail(new CustomError(CustomError.TYPES.invalidParam));
    }

    try {
      await ctx.service.common.sendPhoneCode(ctx.query.phone);
      this.success();
      logger.info('成功发送验证码');
    } catch (err) {
      logger.warn(err);
      this.fail(err);
    }
  }
}

module.exports = CommonController;
