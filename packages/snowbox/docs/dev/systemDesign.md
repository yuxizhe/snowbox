---
nav:
  title: 同构开发方式
  path: /dev
# mobile: false
---

# 样式组件系统

## 简述

样式组件系统本质上就是找到了 UI 样式、组件参数和多端代码实现之间的对应关系，对设计样式属性进行封装和抽象，将常用设计样式的每一种变化都转变为一个组件参数。统一了样式和前端语言，使设计系统可以被正确管理，多端代码能快速实现，而且三端一致。

## 背景

### 设计角度

- 每个元素 开发同学 所用的颜色 / 字体 / 间距等细节都可能和设计稿不一样，每次 UI 走查都要全部看一遍
- 产品新增了夜间模式 甚至 浅黑模式，设计和开发都面临巨大的工作量
- 大佬们觉得主题色的紫色不大气，需要换主题色为浅蓝色，并且所有的卡片间距要减小，如何快速实现？
- 不同设计师输出的设计稿可能细节不同，如何统一？

### 开发角度：

- 写样式时，要给每个元素想一个有意义的 classname，很痛苦
- css,js 两个文件来回切换，完成的样式开发

- css 样式需隔离，有全局覆盖风险
- css 样式冗余，属性重复定义，css 体积不断增大
- css 无法抽象，客户端平台不支持

- RN 样式写法繁琐冗余，要设置日夜间主题颜色、布局方式、文字大小
- RN 无样式选择，无样式继承，每个元素都要重新设置
- RN 屏幕适配需所有元素属性都写适配函数
- RN 双端样式有细微差异，每个元素都要注意

<center><i><b>之前的业务代码</b></i></center>

<div align='center'>
<img src = "https://xqimg.imedao.com/1833f247a521eafe3fe6c04a.png" width = "75%" /></div>

## 样式组件系统 styled system

对比市面多种方案和最佳实践，最终受 **styled system** 启发，自研了一套样式组件系统。

样式组件系统本质上就是找到了**UI 样式、组件参数和多端代码**实现之间的对应关系，对设计样式属性进行封装和抽象，将常用设计样式的**每一种变化都转变为一个组件参数**。统一了设计样式和前端语言，使设计系统可以被正确管理，多端代码能快速实现，而且三端一致。

最开始的各种问题，都可以通过 样式组件系统 进行优化解决。

### 优点

- 实现 Design Tokens ，统一 设计样式和前端语言
- 编程思路顺畅，编写迅速，无需 js css stylesheet 来回切换
- 书写代码量少，减低 90%的样式代码量
- 业务代码编译后的代码精简，css 占比高，RN 包体积减少
- 样式组件系统自身代码量少
- 自带主题切换颜色，无需获取并传递日夜间主题
- 无需 import 一堆依赖，直接使用
- 尺寸样式自带屏幕适配，无需给每个样式写屏幕适配代码
- 没有样式命名的烦恼
- 自带样式隔离，没有样式覆盖冲突，不用关心样式冲突
- 样式文件体积小、逐渐收敛
- 适配三端，兼容三端差异

<div align='center'>
<img src = "https://xqimg.imedao.com/1833f2485661ef7d3fda3ce9.png" width = "75%" /></div>

> - [NativeBase](https://docs.nativebase.io/utility-first)
> - [Shopify/Restyle](https://github.com/Shopify/restyle)
> - [Theme UI](https://theme-ui.com/)
> - [tamagui](https://tamagui.dev/docs/intro/introduction#why-inline-style-props)
> - [jsxstyle](https://github.com/jsxstyle/jsxstyle)

## Design Tokens / 声明式 UI

设计师们会比较熟悉 Design Tokens 的概念，它是一种设计师和开发共同使用的工作思维和方法。Tokens 的本意是“令牌 / 指令”，与 Design 连起来可以被理解为“设计变量”。

而样式组件系统，恰好实现了一套 Design Tokens。

如下图，我们可以分别将 Box 的背景色、文字色、文字属性定义成 Token，用**代码化的语言**，将组件的每一部分**属性**进行描述，并对颜色进行**规律的代码化命名**。也就是最方便的声明式 UI。

<div align='center'>
<img src = "https://xqimg.imedao.com/1833f247f321eb003fc4689f.png" width = "75%"/></div>

最后由样式组件系统编译为三端能用的代码。并渲染展示。

<div align='center'>
<img src = "https://xqimg.imedao.com/1833f247d831eaff3fdbf022.png" width = "75%"/></div>

> [Design Tokens 在设计系统中的意义与应用](https://mp.weixin.qq.com/s/Sa2pvDM_h7C-OfR_QYCLaw)

## 样式组件系统 解析流程概述

<div align='center'>
<img src = "https://xqimg.imedao.com/1833f2488c61ef1b3fd4a795.png"/></div>

## 样式组件系统核心实现

采用两个基础组件来实现这个系统，分别是盒子组件 Box 和 文字组件 Txt。并通过 Typescript 进行规范和提示。

### [**Box**](http://f2e.snowballfinance.io/snowbox-ui/components/box)

盒子组件，相当于 web 的 Div 和 RN 里的 View 。
实现盒模型，定位，样式属性简写，颜色系统，主题切换，屏幕大小自适应，三端差异抹平等功能。

### [**Txt**](http://f2e.snowballfinance.io/snowbox-ui/components/txt)

文字组件
支持字号、字重、颜色、雪球常用 DIN 字体等，封装行内占位，三端差异抹平等等常用功能。

### [**颜色系统**](http://f2e.snowballfinance.io/snowbox-ui/components/color)

与每个样式单独写颜色色值不同，规范的设计系统，要有一套颜色系统的，将 UI 颜色和规范进行收敛控制，实现多主题切换，并用语义化的描述。

比如雪球设计规范中：
T010: 一级文字颜色 B010 一级背景颜色，同时包含日夜间主题的颜色。

### [**屏幕适配系统**](http://f2e.snowballfinance.io/snowbox-ui/components/auto-screen)

样式组件系统，所有的尺寸样式自带屏幕适配，无需给每个样式写屏幕适配代码。

### Types

通过采用 typescript，对两个组件 types 的规范定义，定义了每个 props 值的类型和枚举值，实现书写的提示和规范性。并进一步实现 Design Token。

types 定义(以文字属性为例)

<img src = "https://xqimg.imedao.com/1833f2484301ef193fea71a3.png" width = "75%"/>

代码提示:

<img src = "https://xqimg.imedao.com/1833f2483f81f2f23fe037f9.png" width = "75%"/>

错误使用属性时的提示：
比如在文字组件使用了 被禁止的 padding 属性

<img src = "https://xqimg.imedao.com/1833f248a401f2f33fe94da9.png" width = "75%"/>

## 抹平三端差异

由于该组件系统在三端使用，部分属性会在不同客户端出现差异。比如字重 500，在安卓系统下不会生效，比如 DIN 字体，安卓客户端里需要使用 DIN-medium。

以往遇到这种情况，需要单独做兼容，每个元素都要写一遍。采用样式组件系统后，将兼容代码进行封装，业务代码不用关心细微差异，降低代码量。

## 样式系统解析流程

<div align='center'>
<img src = "https://xqimg.imedao.com/1833f24851a1f20c3fdaa475.png" width = "75%"/></div>

<div align='center'>
<img src = "https://xqimg.imedao.com/1833f248be41ed973fedb267.png" width = "75%"/></div>

**外层 box**

<div align='center'>
<img src = "https://xqimg.imedao.com/1833f2490f21f2f53febbd2b.png" width = "75%"/></div>

**内层文字**

<div align='center'>
<img src = "https://xqimg.imedao.com/1833f248c771f2f43fcec714.png" width = "75%"/></div>

<div align='center'>
<img src = "https://xqimg.imedao.com/1833f2491451ee483fd8292f.png" width = "75%"/></div>
