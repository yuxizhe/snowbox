---
nav:
  title: Components
  path: /components
mobile: true
group:
  title: Components
  order: 2
---

# NoticeBar 通知条

滚动展示消息通知，适用于当前页面内信息的通知，是一种较醒目的页面内通知方式。

Demo:

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { NoticeBar, Box } from 'snowbox-ui';

export default () => (
  <Box bg="#072872" col>
    <NoticeBar text="滚动提示条" />
    <NoticeBar text="隐藏关闭按钮" hideCloseBtn={true} />
    <NoticeBar iconProps={{ type: 'icon_s_plane' }} bgColor="T010" textColor="B010" text="滚动提示条" />
  </Box>
);
```

## API

| Name         | Description                                    | Type      | Default      |
| ------------ | ---------------------------------------------- | --------- | ------------ |
| text         | 滚动的文本                                     | `string`  | `(required)` |
| bgColor      | 背景颜色，雪球统一设计规范的颜色代码           | `string`  | `B020`       |
| textColor    | 字体颜色，雪球统一设计规范的颜色代码           | `string`  | `T020`       |
| iconProps    | 提示 icon 参数，同`icon`组件 props             | `object`  | `{}`         |
| hideCloseBtn | 是否隐藏关闭按钮                               | `boolean` | `false`      |
| url          | 用于判断是否显示跳转 icon。跳转写在 onpress 里 | `string`  | `-`          |
| onPress      | 点击事件                                       | `func`    | `-`          |
