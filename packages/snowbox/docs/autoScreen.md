---
nav:
  title: Components
  path: /components
mobile: false
group:
  title: 基础组件
  order: 4
---

# 屏幕适配

屏幕适配系统

snowbox 所有的尺寸样式自带屏幕适配，无需给每个样式写屏幕适配代码。

比如设计稿中以 iPhone8 375 为基准。

只需写 `<Box m={20} p={20} f={14} />`

需要关闭自动适配时，可以设置`noAuto`

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { Box } from 'snowbox';

export default () => (
  <Box col>
    <Box mt={10} DIN cl="T020">
      默认自动屏幕适配
    </Box>
    <Box>
      <Box c w={300} h={50} bg="Blu011" f={20} fw="800" br={5} DIN>
        300*50
      </Box>
    </Box>
    <Box mt={10} DIN cl="T020">
      noAuto: 不进行屏幕适配
    </Box>
    <Box>
      <Box c w={300} h={50} bg="Blu011" f={20} fw="800" br={5} DIN noAuto>
        300*50
      </Box>
    </Box>
  </Box>
);
```
