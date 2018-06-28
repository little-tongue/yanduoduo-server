# 颜多多服务端

除敏感配置外，包含颜多多服务端全部源码及文档，仅供学习参考。

项目基于 [Egg.js](https://eggjs.org/zh-cn/) 构建。

## 快速开始

**注意：因为有一部分敏感配置没有上传，所以源码直接 clone 下来启动会报错，请创建自己的配置。**

如下：

```js
// config/secret.js

module.exports = {
  cookieSignKey: '',
  redisPwd: '',
  aliYun: {
    accessKeyId: '',
    secretAccessKey: '',
  },
  mysql: {
    username: '',
    password: '',
  },
};
```

### 本地开发

1. 下载源码并安装依赖

```bash
$ git clone https://github.com/little-tongue/yanduoduo-server.git
$ cd yanduoduo-server
$ npm i
```
2. 启动服务 

```bash
$ npm run dev
```

应用默认监听 `7001` 端口，待应用启动后，通过 `http://localhost:7001` 即可访问。

### 部署

1. 下载源码并安装依赖

```bash
$ git clone https://github.com/little-tongue/yanduoduo-server.git
$ cd yanduoduo-server
$ npm i --production # 只安装项目依赖
```

2. 生产环境下启动

```bash
$ npm start
```

执行 `npm stop` 可停止服务。

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。
