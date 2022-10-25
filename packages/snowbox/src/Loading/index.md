---
nav:
  title: Components
  path: /components
mobile: true
group:
  title: Components
  order: 2
---

# Loading 加载中

加载中的效果

Demo:

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { Loading, Box } from 'snowbox-ui';

export default () => (
  <Box col p={30}>
    <Loading h={100} />
  </Box>
);
```

API

props 同 Box 的 props，作用于 loading 动画的容器上
