#分销后台前端
基于antd-admin

## 开发及构建

### 目录结构

```bash
├── /mock/           # 数据mock的接口文件
├── /dist/           # 项目输出目录
├── /src/            # 项目源码目录
│ ├── /static/       # 静态文件 image……
│ ├── /components/   # 项目组件
│ ├── /routes/       # 路由组件
│ ├── /models/       # 数据模型
│ ├── /services/     # 数据接口
│ ├── /utils/        # 工具函数
│ ├── route.js       # 路由配置
│ ├── index.js       # 入口文件
│ └── index.html     
├── package.json     # 项目信息
└── proxy.config.js  # 数据mock配置

```

### 快速开始

分支：
```
开发：dev   
测试：test 
预生产：proprod 
生产：master 
```

进入目录安装依赖:

```
npm i 或者 yarn install
```

开发：

需要在本地安装nginx，具体配置参见：https://coding.net/s/b912a81f-3d8b-4693-80c2-73c6ae05ab77

```bash
npm run dev    # 使用mock拦截请求，数据存储在localStroge里；否则请求开发环境接口。

打开 http://localhost 或者 127.0.0.1
```


构建：

```bash
npm run build

将会生成dist目录
```

### 注意事项

- 生产环境中，已有数据接口，请将`src/utils/index.js`第四行 `require('./mock.js')`注释
- 开发环境中，如再mock目录新增文件，请在`src/utils/mock.js`第二行的`mockData`数组中添加
- 开发环境中，如需要调试开发环境接口，在mock中将`api/xxx/xx/`的前面加上`off/`
- 如需重写antd样式配置，请修改`src/theme.js`
- 项目配置文件在`src/utils/config.js`
- 如需重写异步请求函数，请修改`src/utils/request.js`
  （关于为什么使用robe-ajax而不是fetch：在一个无服务器的环境中模拟数据请求，[Mock](https://github.com/nuysoft/Mock)不能拦截Fetch，只能拦截XHR，所以我选了一个类似jquery Ajax的库robe-ajax）

