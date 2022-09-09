---
nav:
  title: Components
  path: /components
mobile: false
group:
  title: 基础组件
  order: 4
---

## 颜色

按照雪球设计颜色规范，提供颜色简写，编辑器提示，自动适配日夜间模式。将 UI 颜色和规范进行收敛控制，实现多主题切换，并用语义化的描述。

- cl: color 文字颜色

- bg: backgroundColor 背景颜色

Box 组件 支持 颜色/背景颜色

Txt 组件 支持颜色

```js
<Box bg="B010" cl="T010">颜色</Box>
<Txt cl="T010">颜色</Txt>
```

### 颜色列表

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { Box, ThemeColor } from 'snowbox';

export default () => (
  <Box m={10} p={10} br={10} bg="B020" style={{ flexWrap: 'wrap' }}>
    {Object.keys(ThemeColor).map((item) => {
      return (
        <Box col m={10}>
          <Box>{item}</Box>
          <Box>
            <Box m={5} w={80} h={80} bg={ThemeColor[item].day}></Box>
            <Box m={5} w={80} h={80} bg={ThemeColor[item].night}></Box>
          </Box>
        </Box>
      );
    })}
  </Box>
);
```

### 直接颜色引用

也可以从 snowbox 直接引用颜色

```js
import { ThemeColor } from 'snowbox';

color = ThemeColor.T010[theme];
```

### 强制日间模式

当页面只有日间模式（比如蛋卷迁移过来的页面），可以屏蔽夜间模式。在 index.js 注册时，Wrapper 第二个参数传'day'即可。

```js
AppRegistry.registerComponent('DissolutionDenied', () => Wrapper(DissolutionDenied, 'day'));
```
