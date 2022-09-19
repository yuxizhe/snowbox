---
nav:
  title: Components
  path: /components
# mobile: false
group:
  title: Components
  order: 2
---

# Radio 单选框

单选框组件

支持默认勾选，禁用，点击回调。有两种默认尺寸，也支持手动设置。

Demo:

```tsx
import React from 'react';
import { Box, Radio } from 'snowbox';

export default () => (
  <Box col>
    <Box mt={50}>
      <Box c flex={1}>
        <Radio size="m" showTip onChange={(checked) => console.log(checked)} mr={4} />
        <Box>默认</Box>
      </Box>
      <Box c flex={1}>
        <Radio size="m" onChange={(checked) => console.log(checked)} disabled mr={4} />
        <Box cl="T040">不可点</Box>
      </Box>
      <Box c flex={1}>
        <Radio size="m" onChange={(checked) => console.log(checked)} checked mr={4} />
        <Box>选中</Box>
      </Box>
    </Box>
    <Box mt={5}>
      <Box c flex={1}>
        <Radio size="s" onChange={(checked) => console.log(checked)} mr={4} />
        <Box>默认</Box>
      </Box>
      <Box c flex={1}>
        <Radio size="s" onChange={(checked) => console.log(checked)} disabled mr={4} />
        <Box cl="T040">不可点</Box>
      </Box>
      <Box c flex={1}>
        <Radio size="s" onChange={(checked) => console.log(checked)} checked mr={4} />
        <Box>选中</Box>
      </Box>
    </Box>
  </Box>
);
```

<API></API>
