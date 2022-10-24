---
nav:
  title: Components
  path: /components
# mobile: false
group:
  title: Components
  order: 2
---

# Checkbox 多选框

多选框组件

支持默认勾选，禁用，点击回调。

Demo:

```tsx
import React from 'react';
import { Box, Checkbox } from 'snowbox-ui';

export default () => (
  <Box mt={5}>
    <Box c flex={1}>
      <Checkbox onChange={(checked) => console.log(checked)} mr={4} />
      <Box>默认</Box>
    </Box>
    <Box c flex={1}>
      <Checkbox onChange={(checked) => console.log(checked)} disabled mr={4} />
      <Box cl="T040">不可点</Box>
    </Box>
    <Box c flex={1}>
      <Checkbox onChange={(checked) => console.log(checked)} checked mr={4} />
      <Box>选中</Box>
    </Box>
  </Box>
);
```

<API></API>
