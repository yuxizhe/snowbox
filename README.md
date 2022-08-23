## SnowBox 雪球 RN/H5 同构组件库

### 最新文档：

> https://xueqiu.feishu.cn/wiki/wikcnwBWIAiRwveClS500whKyKf

下面文档不保证最新

## 目标

组件库抽离出单独项目，封装 npm 包，完善介绍/例子/网站搭建

- snowbox 组件库抽离出单独项目，封装 npm 包，替换 snb-rn/dj-rn 等项目中的组件
- 项目中包含例子 demo 页
- 项目支持 codesandbox 预览
- 项目支持 expo 三端预览
- 支持 codesandbox CI
- 完善介绍/例子/网站搭建
  - React Native 组件参考
  - Button 按钮 - Ant Design Mobile
  - panel-docs.tuyacn.com
- 介绍 参考：
  - 技术融合的文章 https://mp.weixin.qq.com/s/BGGsuYrlojMfTqfTo71VZg

> Git 仓库 http://git.snowballfinance.com/f2e/snowbox

## Monorepo

workspace 实现

## 项目

### 1.snowbox 组件库

项目封装

### 2.Examples App

雪球 demo
可在雪球 app 内开发使用 三端同构

Expo demo app
可通过 expo 进行开发使用 三端同构

Nextjs demo
web 版

Vite demo（低优先级）
web 版

### 3.website 介绍网站

参考 dumi 进行文档编写
dumi - 为组件开发场景而生的文档工具 - dumi
移动端：进阶使用 - dumi

组件介绍由 每个组件下的 md 文档实现，参考

> https://github.com/ant-design/ant-design-mobile/tree/master/src/components/button

### 4.benchmarks 性能测试

### 5.组件单元测试

RN 组件库单元测试及 CI 调研

> https://xueqiu.feishu.cn/wiki/wikcnoIkK9T6w6U8mxwHBaD8Vtb
