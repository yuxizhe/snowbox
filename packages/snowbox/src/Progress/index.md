---
nav:
  title: Components
  path: /components
# mobile: false
group:
  title: Components
  order: 2
---

# Progress 进度条

进度条组件

支持自定义长度，进度，箭头样式。

Demo:

```tsx
import React from 'react';
import { Box, Progress } from 'snowbox-ui';

export default () => (
  <Box col m={10} p={10} br={10} bg="B020">
    <Box f={20} cl="T010" DIN>
      Progress
    </Box>
    <Box col>
      <Box m={5}>
        <Progress percent={0.1} steps={3} itemStyle={{}} />
      </Box>
      <Box m={5}>
        <Progress percent={0.3} steps={4} itemStyle={{}} />
      </Box>
      <Box m={5}>
        <Progress percent={0.5} steps={5} itemStyle={{}} />
      </Box>
    </Box>
  </Box>
);
```

<API></API>
