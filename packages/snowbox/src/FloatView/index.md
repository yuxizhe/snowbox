---
nav:
  title: Components
  path: /components
# mobile: false
group:
  title: Components
  order: 2
---

# FloatView 浮窗

可拖动浮窗容器，可拖动，并会在拖动结束后根据配置吸附在已配置区域。

支持配置

- 吸附位置(具体参加 API)
- 点击事件
- 拖动开始事件
- 拖动过程中事件
- 拖动结束事件

### Demo

```tsx
import React from 'react';
import { Box, FloatView, Txt } from 'snowbox';

export default () => (
  <Box col flex={1}>
    <Txt>右侧悬停</Txt>
    <Box bg="Org021" h={150} mt={10}>
      <FloatView h={50} w={50} r={13} col panEndMinBottom={0} bg="Chart005" br={'50%'} />
    </Box>
    <Box mt={50}>
      <Txt>左侧悬停</Txt>
    </Box>
    <Box bg="Org021" h={150} mt={10}>
      <FloatView h={50} w={50} l={13} panEndMinBottom={0} adsorption="left" bg="Chart005" br={'50%'} />
    </Box>
  </Box>
);
```

<API></API>
