---
nav:
  title: 同构开发方式
  path: /dev
# mobile: false
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
