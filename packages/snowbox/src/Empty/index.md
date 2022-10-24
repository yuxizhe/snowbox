---
nav:
  title: Components
  path: /components
# mobile: false
group:
  title: Components
  order: 2
---

# Empty 空状态

空数据组件

支持配置

- 宽度
- 高度
- 顶部距离
- 文案信息

Demo:

```tsx
import React from 'react';
import { Box, Empty } from 'snowbox-ui';

export default () => (
  <Box col m={10} p={10} br={10} bg="B020">
    <Box f={20} cl="T010" DIN>
      空状态
    </Box>
    <Box pb={20}>
      <Empty mt={20} text="这里是自定义文案" />
    </Box>
  </Box>
);
```

<API></API>
