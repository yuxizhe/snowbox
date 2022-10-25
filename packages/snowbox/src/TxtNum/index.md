---
nav:
  title: Components
  path: /components
# mobile: false
group:
  title: Components
  order: 2
---

# TxtNum 数字文字组件

数字文字组件

在 Txt 组件的基础上，新增 numProps、textProps 属性分别设置数字和其他文本的样式。

Demo:

```tsx
import React from 'react';
import { Box, TxtNum } from 'snowbox-ui';

export default () => (
  <Box col m={10} p={10} br={10} bg="B020">
    <Box f={20} mb={10} cl="T010" DIN>
      TxtNum 文字
    </Box>
    <Box m={5} cl="T020" DIN>
      功能：在Txt组件的基础上，新增numProps、textProps属性分别设置数字和其他文本的样式
    </Box>
    <Box m={5}>
      <TxtNum textProps={{ cl: 'Red010', fw: '600', f: 12 }} numProps={{ cl: 'Blu010', fw: '500', f: 15, DIN: true }}>
        例如：富国沪深300增强。今年以来 +12.90%,，收益-223,133.88。 汉字是红色、字重600、字号12,
        数字蓝色、字重500、字号15、字体DIN
      </TxtNum>
    </Box>
  </Box>
);
```

<API></API>
