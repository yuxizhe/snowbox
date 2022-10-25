---
nav:
  title: Components
  path: /components
# mobile: false
group:
  title: 基础组件
  order: 1
---

# Box

盒子组件，相当于 web 的 Div 和 RN 里的 View 。

实现盒模型，定位，样式属性简写，颜色系统，主题切换，屏幕大小自适应，三端差异抹平等功能。

支持属性

- 盒模型相关：m: margin p:padding br: border flex: flex
- 定位相关： l:left r: right t: top b: button ab: absolute c: center
- 颜色相关：cl: color bg: backgroundColor 雪球颜色 token
- 文字相关：f: font size fw: font weight lh: line hight cl: color ls: letter spacing DIN： din 字体
- 同时支持 style，可传其他样式

Demo:

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { Box } from 'snowbox-ui';

export default () => (
  <Box bg="Blu011">
    <Box m={20} p={20} flex={1} bg="Blu014" bw={1} bc="Blu010">
      <Box c h={100} bg="Blu010" w="100%" DIN>
        Box 盒子模型
      </Box>
    </Box>
  </Box>
);
```

<API></API>
