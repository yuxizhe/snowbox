---
nav:
  title: Components
  path: /components
mobile: false
group:
  title: 基础组件
---

# Txt

文字组件

支持字号、字重、颜色、雪球常用 DIN 字体等，封装行内占位，三端差异抹平等等常用功能。

## 支持属性

- f: font size
- fw: font weight
- lh: line hight
- cl: color
- ls: letter spacing
- DIN： din 字体

Demo:

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { Box, Txt } from 'snowbox';

export default () => (
  <Box col m={10}>
    <Box f={20} mb={10} cl="T010" DIN>
      Txt 文字
    </Box>
    <Box>
      <Box DIN f={18}>
        {18}
      </Box>
      <Box DIN f={16}>
        .16.
      </Box>
      <Txt DIN f={14}>
        14.
      </Txt>
      <Txt DIN f={12}>
        12.
      </Txt>
      <Txt DIN f={10}>
        10.
      </Txt>
      <Box ml={10} DIN f={14} fw="bold">
        bold.
      </Box>
      <Txt DIN f={14} fw="500">
        500.
      </Txt>
      <Txt DIN f={14} fw="400">
        400.
      </Txt>
      <Box ml={10} DIN cl="Gld010">
        Gld010.
      </Box>
      <Txt DIN cl="Grn010">
        Grn010.
      </Txt>
      <Txt DIN cl="Org010">
        Org010.
      </Txt>
    </Box>
  </Box>
);
```

<API></API>
