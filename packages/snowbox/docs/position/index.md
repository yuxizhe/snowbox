---
nav:
  title: Components
  path: /components
mobile: false
group:
  title: 基础组件
  order: 2
---

## 定位

ab: 绝对定位

彩蛋：snowbox 的 logo 是用下面这段代码生成的

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { Box } from 'snowbox';

export default () => (
  <Box h={120}>
    <Box ab l={0} t={50} w={50} h={50} bg="Blu014" />
    <Box ab l={50} t={50} w={50} h={50} bg="Blu010" />
    <Box ab l={50} t={0} w={50} h={50} bg="Blu011" />
  </Box>
);
```

<API></API>
