---
nav:
  title: Components
  path: /components
# mobile: false
group:
  title: Components
  order: 2
---

# FloatView

可拖动浮窗容器，可拖动，并会在拖动结束后根据配置吸附在已配置区域。

> 支持配置
>
> - 吸附位置(具体参加 API)
> - 点击事件
> - 拖动开始事件
> - 拖动过程中事件
> - 拖动结束事件

### Demo

```tsx
import React from 'react';
import { Box, FloatView } from 'snowbox';

export default () => (
  <Box bg="Org021" h={680}>
    <FloatView h={100} w={100} b={80} r={13} col panEndMinBottom={0} bg="Chart005" br={'50%'} />
  </Box>
);
```

<API></API>
