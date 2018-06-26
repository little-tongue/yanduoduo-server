# 颜多多

颜多多服务端接口说明文档，接口使用 [YApi](https://yapi.ymfe.org/) 进行管理，接口说明由 YApi 生成。

## 服务端响应

每次接口调用服务器都返回如下格式的 JSON：

```json
{
  "status": "success",
  "err_code": null,
  "message": "成功",
  "data": null 
}
```

各字段说明如下：

- status: 表明此次接口调用的结果，`success` 表示成功，`fail` 表示失败。
- err_code: 错误代码，当请求出错时设置此字段。例如：NO_AUTH。
- message: 提示文字。
- data: 返回的数据，可能的取值为：null | Object | Array。

## 用户模块

### 获取短信验证码
<a id=获取短信验证码> </a>
### 基本信息

**Path：** /api/v1/smsCode

**Method：** GET

**接口描述：**
<p>调用此接口向指定手机号发送验证码</p>


#### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| phone | 是  |  13411111111 |  手机号 |

### 注册
<a id=注册> </a>
### 基本信息

**Path：** /api/v1/register

**Method：** POST

**接口描述：**
<p>使用手机号作为用户唯一标示，注册时随机生成用户名。注册时需要验证手机短信。</p>


#### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> phone</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>手机号</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> code</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>验证码</span></td><td key=5></td></tr><tr key=0-2><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> password</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>密码</span></td><td key=5></td></tr><tr key=0-3><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> rePassword</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>重复密码</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
### 登陆
<a id=登陆> </a>
### 基本信息

**Path：** /api/v1/login

**Method：** POST

**接口描述：**
<p>支持手机号／密码和短信登陆两种方式，当 password 参数不为空时，认为是密码登陆，否则认为是短信登陆。</p>


#### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> phone</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>手机号</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> password</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>密码</span></td><td key=5></td></tr><tr key=0-2><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> code</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>验证码，优先使用密码登陆</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
### 重置密码
<a id=重置密码> </a>
### 基本信息

**Path：** /api/v1/resetPassword

**Method：** POST

**接口描述：**


#### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> phone</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>手机号</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> code</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>验证码</span></td><td key=5></td></tr><tr key=0-2><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> password</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>密码</span></td><td key=5></td></tr><tr key=0-3><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> rePassword</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>重置密码</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
### 刷新token
<a id=刷新token> </a>
### 基本信息

**Path：** /api/v1/refreshToken

**Method：** GET

**接口描述：**
<p>token 有效期为 2 小时，当旧的 token 将要过期时，调用此接口可换取新的 token。</p>


#### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| token | 是  |   |  旧的将要过期的 token |

### 获取用户信息
<a id=获取用户信息> </a>
### 基本信息

**Path：** /api/v1/profile

**Method：** GET

**接口描述：**


#### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Authorization  |   | 是  |   |  登陆成功后返回的 token |

### 上传并修改头像
<a id=上传并修改头像> </a>
### 基本信息

**Path：** /api/v1/avatar

**Method：** POST

**接口描述：**


#### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  multipart/form-data | 是  |   |   |
| Authorization  |   | 是  |   |  token |
**Body**

| 参数名称  | 参数类型  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| avatar | file  |  是 |    |  头像图片文件 |



### 退出登陆
<a id=退出登陆> </a>
### 基本信息

**Path：** /api/v1/logout

**Method：** GET

**接口描述：**


#### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Authorization  |   | 是  |   |  token |
