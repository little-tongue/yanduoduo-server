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

## 登录

### 获取短信验证码
<a id=获取短信验证码> </a>

#### 基本信息

**Path：** /v1/smsCode

**Method：** GET

**接口描述：**
<p>调用此接口向指定手机号发送验证码</p>


#### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| phone | 是  |  13411111111 |  手机号 |

### 登陆

<a id=登陆> </a>

#### 基本信息

**Path：** /v1/login

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
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> phone</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">手机号</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> password</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">密码</span></td><td key=5></td></tr><tr key=0-2><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> code</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">验证码，优先使用密码登陆</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
### 微信登录
<a id=微信登录> </a>

#### 基本信息

**Path：** /v1/login/wechat

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
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> openid</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">用户唯一标识</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> name</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap"> 微信名</span></td><td key=5></td></tr><tr key=0-2><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> avatar</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">头像 url</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
### QQ 登录
<a id=QQ 登录> </a>
#### 基本信息

**Path：** /v1/login/qq

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
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> openid</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap"></span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> name</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap"></span></td><td key=5></td></tr><tr key=0-2><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> avatar</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap"></span></td><td key=5></td></tr>
               </tbody>
              </table>
            
### 微博登录
<a id=微博登录> </a>

#### 基本信息

**Path：** /v1/login/sina

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
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> openid</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap"></span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> name</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap"></span></td><td key=5></td></tr><tr key=0-2><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> avatar</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap"></span></td><td key=5></td></tr>
               </tbody>
              </table>
            
### 刷新token
<a id=刷新token> </a>

#### 基本信息

**Path：** /v1/refreshToken

**Method：** GET

**接口描述：**
<p>token 有效期为 2 小时，当旧的 token 将要过期时，调用此接口可换取新的 token。</p>


#### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| token | 是  |   |  旧的将要过期的 token |

### 退出登陆
<a id=退出登陆> </a>

#### 基本信息

**Path：** /v1/logout

**Method：** GET

**接口描述：**


#### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Authorization  |   | 是  |   |  token |

## 用户模块

### 获取用户信息
<a id=获取用户信息> </a>

#### 基本信息

**Path：** /v1/userinfo

**Method：** GET

**接口描述：**


#### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Authorization  |   | 是  |   |  登陆成功后返回的 token |

### 重置密码
<a id=重置密码> </a>

#### 基本信息

**Path：** /v1/user/resetPassword

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
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> phone</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">手机号</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> code</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">验证码</span></td><td key=5></td></tr><tr key=0-2><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> password</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">密码</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
### 修改学校
<a id=修改学校> </a>

#### 基本信息

**Path：** /v1/user/schook

**Method：** PUT

**接口描述：**


#### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> school</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">学校名称</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
### 修改个人简介
<a id=修改个人简介> </a>

#### 基本信息

**Path：** /v1/user/profile

**Method：** PUT

**接口描述：**


#### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> profile</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">个人简介</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
### 修改所在城市
<a id=修改所在城市> </a>

#### 基本信息

**Path：** /v1/user/city

**Method：** PUT

**接口描述：**


#### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> city_code</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap"> 城市代码</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
### 修改用户名
<a id=修改用户名> </a>

#### 基本信息

**Path：** /v1/user/name

**Method：** PUT

**接口描述：**


#### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> name</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap"> 用户名</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
### 修改性别
<a id=修改性别> </a>

#### 基本信息

**Path：** /v1/user/sex

**Method：** PUT

**接口描述：**


#### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> sex</span></td><td key=1><span>number</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">0 标识女，1标识男</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
### 修改生日
<a id=修改生日> </a>

#### 基本信息

**Path：** /v1/user/birthday

**Method：** PUT

**接口描述：**


#### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> birthday</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap"> 出生年月</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
### 上传并修改头像
<a id=上传并修改头像> </a>

#### 基本信息

**Path：** /v1/user/avatar

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

## 关注

### 添加关注
<a id=添加关注> </a>

#### 基本信息

**Path：** /v1/follow

**Method：** GET

**接口描述：**

#### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Authorization  |   | 是  |   |   |
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| id | 是  |   |   要关注的人的 id |

### 取消关注
<a id=取消关注> </a>

#### 基本信息

**Path：** /v1/unfollow

**Method：** GET

**接口描述：**


#### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Authorization  |   | 是  |   |   |
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| id | 是  |   |  已关注的人的 id |

### 我关注的人
<a id=我关注的人> </a>

#### 基本信息

**Path：** /v1/following

**Method：** GET

**接口描述：**

#### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Authorization  |   | 是  |   |   |
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| sortby | 否  |   |  依据什么进行排序 |
| order | 否  |  asc | desc |  排序方式：从小到大或者从大到小 |
| offset | 是  |   |  当前页数 |
| limit | 是  |   |  每页数目 |

### 关注我的人
<a id=关注我的人> </a>

#### 基本信息

**Path：** /v1/followers

**Method：** GET

**接口描述：**

#### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Authorization  |   | 是  |   |   |
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| offset | 是  |   |   |
| limit | 是  |   |   |
| sortby | 否  |   |   |
| order | 否  |   |   |

## 点赞

###  赞过我的人
<a id= 赞过我的人> </a>

#### 基本信息

**Path：** /v1/likers

**Method：** GET

**接口描述：**


#### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Authorization  |   | 是  |   |   |
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| offset | 是  |   |   |
| limit | 是  |   |   |
| sortby | 否  |   |   |
| order | 否  |   |   |

### 我赞过的人
<a id=我赞过的人> </a>

#### 基本信息

**Path：** /v1/liking

**Method：** GET

**接口描述：**


#### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Authorization  |   | 是  |   |   |
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| offset | 是  |   |   |
| limit | 是  |   |   |
| sortby | 否  |   |   |
| order | 否  |   |   |

### 点赞
<a id=点赞> </a>

#### 基本信息

**Path：** /v1/like

**Method：** GET

**接口描述：**


#### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Authorization  |   | 是  |   |   |
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| id | 是  |   |  要点赞的人的 id |

## 动态

### 发布动态
<a id=发布动态> </a>

#### 基本信息

**Path：** /v1/dynamic

**Method：** POST

**接口描述：**


#### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  multipart/form-data | 是  |   |   |
| Authorization  |   | 是  |   |   |
**Body**

| 参数名称  | 参数类型  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| description | text  |  是 |    |  描述文字 |
| illustration | file  |  是 |    |  插图 |
| location | text  |  是 |    |  位置 |



### 删除已发布的动态
<a id=删除已发布的动态> </a>

#### 基本信息

**Path：** /v1/dynamic

**Method：** DELETE

**接口描述：**


#### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/x-www-form-urlencoded | 是  |   |   |
| Authorization  |   | 是  |   |   |
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| id | 是  |   |  动态 id |

### 获取指定用户的所有动态
<a id=获取指定用户的所有动态> </a>

#### 基本信息

**Path：** /v1/dynamics

**Method：** GET

**接口描述：**


#### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Authorization  |   | 是  |   |   |
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| id | 是  |   |  用户 id |
| offset | 是  |   |   |
| limit | 是  |   |   |
| sortby | 否  |   |   |
| order | 否  |   |   |

### 获取推荐的动态
<a id=获取推荐的动态> </a>

#### 基本信息

**Path：** /v1/dynamic/recommend

**Method：** GET

**接口描述：**


#### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| offset | 是  |   |   |
| limit | 是  |   |   |
| sortby | 否  |   |   |
| order | 否  |   |   |

### 获取关注的人的动态
<a id=获取关注的人的动态> </a>

#### 基本信息

**Path：** /v1/dynamic/following

**Method：** GET

**接口描述：**


#### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| offset | 是  |   |   |
| limit | 是  |   |   |
| sortby | 否  |   |   |
| order | 否  |   |   |

### 点赞动态
<a id=点赞动态> </a>

#### 基本信息

**Path：** /v1/dynamic/like

**Method：** GET

**接口描述：**


#### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Authorization  |   | 是  |   |   |
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| id | 是  |   |   动态 id |
| tag | 是  |   |  动态标签 |
