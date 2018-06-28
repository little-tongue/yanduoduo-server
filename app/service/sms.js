/**
 * 短信服务
 *
 * @author biu
 * @date 2018/6/28
 */

'use strict';

const Service = require('egg').Service;
const SMSClient = require('@alicloud/sms-sdk');

class SmsService extends Service {
  async sendPhoneCode(phoneNum, code) {
    const { app } = this;
    const { config } = app;

    const smsClient = new SMSClient({
      accessKeyId: config.sms.accessKeyId,
      secretAccessKey: config.sms.secretAccessKey,
    });

    return smsClient.sendSMS({
      PhoneNumbers: phoneNum,
      SignName: config.sms.signName,
      TemplateCode: config.sms.templateCode,
      TemplateParam: JSON.stringify({
        phone_num: phoneNum,
        code,
      }),
    });
  }
}

module.exports = SmsService;
