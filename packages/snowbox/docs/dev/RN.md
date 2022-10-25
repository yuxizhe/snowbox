---
nav:
  title: 同构开发方式
  path: /dev
mobile: false
---

# RN 同构开发方式

详细文档：

> https://xueqiu.feishu.cn/wiki/wikcnlOyt7kWFgKKaQ7mbXrheqe#

优化 RN 开发流程，降低开发难度，提高开发体验。

对于大部分同学来说 RN 开发非常不方便。比如 RN UI 开发、元素审查要一直盯着手机屏幕，RN 页面状态管理、网络请求查看、接口联调没有方便的官方工具，甚至没有最佳实践，大部分是通过打 log 来判断。所以开发调试困难、效率低。

在实现了 RN/H5 同构后，需求开发初期，完全可以用常规 H5 的开发方式进行逻辑开发、UI 初步编写和接口联调。在逐步熟悉 RN 后，再在客户端内进行 UI 样式微调。降低了开发难度，提高了开发体验。

## 简要发版流程

### 客户端 RN

- feature 包：从个人 feature`往公共feature-xxx`分支合代码，代码合并后会自动发布
- RC 包：从个人 feature 往`release`分支合代码，`随后在mpaas点击发布RC包`，设置最低版本限制
- 上线：从 RC 预发布页面，点击“创建生产版本”

### 同构 H5

和前端项目一致：

- sep/sit:从个人 feature 往`sep/sit分支`合代码，rolling 部署 sep/sit
- rc/staging: 从个人 feature 往`staging分支`合代码，rolling 部署 staging
- 上线：从`个人feature`往`prod分支`合代码，rolling 部署 prod

## 开发流程

### 建立分支

snb-rn 项目，从 master 分支建立 feature-xxx 分支。如需跟客户端混合开发，则命名需与客户端分支名保持一致。

### 项目结构

```
├── index.js
├── rn_routes.json
├── pages
│ └── PrivateFund
│ ├── index.js
│ └── index.web.js
│ ├── RNSettings
│ ├── snowbox-ui
│ ├── \_app.web.tsx
│ └── index.web.tsx
├── next.config.js
├── babel.config.js
├── build_node.sh
├── server
│ ├── middlewares.js
│ └── proxy.js
├── server.js
├── process.json
├── snowbox-ui
│ ├── Box
│ ├── Txt
│ ├── Utils
│ ├── index.tsx
│ └── theme
├── common
├── tsconfig.json
├── package.json
└── yarn.lock
```

### 开发启动

- **web** yarn web-dev
- **RN** yarn dev

**_web 访问_**

访问 http://localhost:7878/rn 即可打开 web 版
使用同构开发，web&浏览器调试模式为主。借助 react 开发工具调试逻辑

<img src = "https://xqimg.imedao.com/1833f2477cc1ef183fc95a97.png" width = "75%"/>

**_RN 访问_**

摇一摇进入调试页，设置 IP，连接本地 IP，进行 RN 客户端内开发。

### 新增页面

在 pages 目录中新建文件夹，注意目录的选择，会决定 web 页面的路由 url，尽量根据业务模块放在一起。

#### web 路由注册

由于采用 nextjs，可以实现自动注册路由。next 会根据 pages 目录结构，生成对应的 url 路由。
同构项目需在文件目录下添加 index.web.js ，即可实现路由注册，进行同构渲染，访问 url 是 `/rn/目录` 或 `/目录` ，两种都行。

```
newPage
├── index.js
├── index.web.js
```

**服务端渲染**

```
//index.web.js
import { Wrapper } from 'snowbox-ui';
import Page from '.';

export default Wrapper(Page);
```

_注：如果需要特殊配置类似蛋卷官网的头部，可以参考如下示例_

```
import { Wrapper } from 'snowbox-ui';
import Header from '@/webComponents/Header';
import Page from '.';

const Demo = () => {
  return (
    <>
      <Header />
      <Page />
    </>
  );
};

export default Wrapper(Demo);
```

<img src = "https://xqimg.imedao.com/1833f2473721ef7b3fcf51e8.png"/>

> [RN/H5 同构服务端渲染介绍](https://xueqiu.feishu.cn/wiki/wikcnAtxf8T2cV8Ynp45U8iLvCh)

**非服务端渲染**

不想使用服务端渲染时可以关闭，前期开发可以关闭服务端渲染。之后就能通过 `http://localhost:7878 /rn/目录` 访问 web 版

```
//index.web.js
import dynamic from 'next/dynamic';
import { Wrapper } from 'snowbox-ui';

const Page = dynamic(() => import('./index'), {
  ssr: false,
});

export default Wrapper(Page);
```

**添加 index.web.js 的原因**

next.js 会根据 pages 目录结构，生成对应的 url 路由，但是之前 RN 的页面目录也是 pages，next 会打包全部 pages 中的页面，部分没有同构的页面打包会报错。需要控制只打包同构的页面，所以添加标识 `web`，并设置 next 只处理 web.js 后缀的作为入口文件。
可以配置 next 的 `pageExtensions` 项。
pageExtensions 的默认值是 ['tsx', 'ts', 'jsx', 'js'], 为同构入口文件定义一个新的后缀名，`.web.js`.

> https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions

```
module.exports = {
  outDir: 'dist',
  // 入口只选web.js后缀的
  pageExtensions: ['web.jsx', 'web.js', 'web.tsx', 'web.ts'],
```

#### RN 路由注册

**RN 页面注册**
在根目录 index.js 中新增引用来注册，在 RN 调试页中就可以找到新增的入口，客户端内 可通过调试页 点击进入

**RN 路由注册**
为了能在客户端内通过 url 访问 RN 页面，需要在 rn_routes.json 中添加对应的 url，使客户端能解析 url，要与 web 路由保持一致，使 H5 也能唤起客户端进入对应页面。

_注意：第一次新增，需提交并打成包，客户端下载包解析后才生效_

```JSON
[
  {
    "title": "组件库",
    "path": "/rn/snowbox-ui",
    "module": "snowbox-ui"
  },
  {
    "title": "私募商品页",
    "path": "/rn/PrivateFund/Product",
    "module": "PrivateFundProduct"
  },
 ]
```

#### 线上路由解析

**新页面** 建议使用 `/rn` 路由
我们已将 `/rn` 的路由注册到 nginx，前端项目发版后就能访问，无需 SRE 单独配置

https://xueqiu.com/rn

https://xueqiu.com/rn/snowbox-ui

**重构页面** 需保留原 url 能访问到的情况

- 方法 1：在之前 url 的 node 项目设置重定向 res.redirect 到新页面，无需 SRE 修改
- 方法 2: 配置 next 的 rewrite, 将原 url 重定向到 项目路由。发版后需要 SRE 改下解析，将相应 url 解析到 `snb-rn` 项目

### 页面逻辑开发

建议在 web 端完成页面基本逻辑开发，使用 vscode + chrome + snowbox-ui 组件库 ，即可快速完成页面基本逻辑和初步样式框架。之后再在客户端内进入 RN 样式微调。

[RN/H5 同构组件库 snowbox-ui](https://xueqiu.feishu.cn/wiki/wikcnMeLejj9efweQ5loiMXKW5g?from=from_parent_docs)

#### 样式初步

chrome 选择 iphone se 宽度 375，可直接与设计稿 1：1 对照。

_注意：由于 web&ios&安卓还是有些细微差异，比如元素撑满的差异，此处只是样式初步，后续需要 UI 微调_

```html
<Box m="{20}" p="{20}" flex="{1}" bg="Blu014" bw="{1}" bc="Blu010">
  <Box c h="{50}" bg="Blu010" w="100%" DIN>
    Box 盒子模型
  </Box>
</Box>
```

[**同构渲染流程**](http://f2e.snowballfinance.io/snowbox-ui/dev/system-design)

#### 页面数据查看

打开浏览器调试工具，安装 React Developer Tools https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=zh-CN

<center><i>页面内部 state、hooks、store 数据查看</i></center>

<div align='center'>
<img src = "https://xqimg.imedao.com/1833f24781c1ee473fd87a2e.png" width = "75%" /></div>

<center><i>组件参数</i></center>

<div align='center'>
<img src = "https://xqimg.imedao.com/1833f247b961f20b3fe45b68.png" width = "75%" /></div>

#### 接口调试

可直接在 chrome 里进行接口联调开发，接口内容查看简单高效。

<div align='center'>
<img src = "https://xqimg.imedao.com/1833f2479ca1f2093fea3bfe.png" width = "75%" /></div>

## 客户端内调试

页面基本逻辑&UI 初步开发完成后，可以进入客户端内同构开发&样式微调阶段

### 同时开启 web & RN

两个窗口同时运行 `yarn web-dev` 和 `yarn dev`

### UI 微调

同时连接 web android ios，一次改动三端同步热更新，进行三端 UI 微调。

由于 *web&ios&安卓*还是有些细微差异，比如元素撑满的差异，所以一定需要看下三端。

**RN 日常开发**

- 建议配置双端手机
- 性能好电脑可以尝试模拟器

> [IOS 模拟器调试 RN 方式总结](https://xueqiu.feishu.cn/docs/doccnJZNvQrrCSawr0JiuU1phuf?from=from_parent_docs)

## 三端特殊处理写法

因为要至少支持 3 端，而 3 端难免会有些代码需要特殊处理，比如路由跳转、三端不同的组件。我们封装了 snowbox-ui 组件库。

### 常用方式

#### 使用 OS 判断

```
import {OS} from 'snowbox-ui';
OS: "ios" | "android" | "windows" | "macos" | "web" | "node"
// 非服务端渲染
if (OS === 'web') {
  wx = require('weixin-js-sdk');
}
// 服务端渲染
if (OS === 'node') {
  useStaticRendering(true);
}
if (OS === 'ios') {

}
```

#### 建立目录，目录下通过后缀区分

使用 OS 判断时，在项目打包时还是会被打进 bundle，比如微信分享 jssdk，在 RN 中存在完全没有意义，徒增代码包体积，所以希望打包时只打包所需要的代码。

这时可以使用特定平台扩展名的方式。

```
RNBridge
├── index.js  # 由 Webpack, next 或者其他打包工具打包的文件
├── index.native.js  # 由 React Native 自带打包工具(Metro) 打包的文件
```

引用时

```
 import RNbridge from './RNBridge'
```

**引用路径不用写到文件夹内的具体 js 路径**，由打包工具来选择不同的文件。这个功能是 Metro 提供的，无需设置，能做到代码按需加载。

目前 rnBridge、微信分享 sdk、react-native-svg 等等均采用这种方式。

### 全局变量使用

#### 页面 props 通用参数

RN 中我们会对所有页面用一个 wrapper 函数封装，处理客户端传递来的全局参数，比如主题，url，uid, ua 等。

在服务端渲染时，可以认为服务端也是一种特殊的端容器，同样可以给 RN 传入 props。

在 nextjs 中，使用\_app.web.tsx 即可实现，
getInitialProps 从 node ctx 中 获取主题、url、uid、ua 等参数。传递 props。

所以 web 也需要实现 wrapper，封装在 snowbox-ui 里，在 index.web.js 中引入即可

```
import { Wrapper } from 'snowbox-ui';
import Page from '.';

export default Wrapper(Page);
```

#### RN 全局变量

常规方式是使用 react context 传递。使用较繁琐，不支持直接取值，所以对一些全局变量进行了封装。

无需函数式组件，可直接使用。

```
import { THEME, Window, OS, gVar } from 'snowbox-ui';
```

#### OS 封装

逻辑需对平台进行判断，比如某些逻辑在 node 上无需执行。

而 RN Platform.OS 只有 **"ios" | "android" | "windows" | "macos" | "web"** 5 种
在同构项目中 web 其实还分为两种，一种是 `web`， 一种是 `node` 服务端渲染。

我们每次都需要单独进行判断

```
const isNodeEnv = typeof 'process' !== 'undefined' && process && process.versions && process.versions.node;
```

所以在 snowbox-ui 中也进行封装，开箱即用。

```
import { OS } from 'snowbox-ui';
/**
 * OS: "ios" | "android" | "windows" | "macos" | "web" | "node"
 * **/
```

#### Window 封装

web 项目难免会对 window 进行访问，比如 `window.location.href`操作 url `window.navigator.userAgent`获取 UA 等。

而在 RN 和 node 中，使用该变量会报错，一旦错误使用，还会引起 RN 中的白屏，问题很严重。

所以我们对 window 也进行了封装。

```
import { Window } from 'snowbox-ui';
//Window.location.href
//Window.navigator.userAgent
```

**将一些常用的数据进行同构，使在 RN 中、node 中、web 中都能正确获取，减少代码，提高代码稳定性。**

## 同构开发好处

- **减低开发门槛**

  同构后，chrome+vscode 即可开发业务逻辑，配置要求变低。

- **提高 RN 开发调试效率**

  页面框架、逻辑编写、接口联调 均可在 web 端实现，开发调试很方便。

  可以使用所有的 react web dev 工具，比如控制台、react-devtool、mobx、redux

- **借助 web 各种成熟工具，能发现 RN 不容易发现的问题**

  比如图片体积过大等,next 打包时也会有提示
