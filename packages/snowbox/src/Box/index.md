---
nav:
  title: Components
  path: /components
mobile: false
group:
  title: 基础组件
  order: 1
---

# Box

## Box 组件

盒子组件，相当于 web 的 Div 和 RN 里的 View 。

实现盒模型，定位，样式属性简写，颜色系统，主题切换，屏幕大小自适应，三端差异抹平等功能。

### 支持属性

- 盒模型相关：m: margin p:padding br: border flex: flex
- 定位相关： l:left r: right t: top b: button ab: absolute c: center
- 颜色相关：cl: color bg: backgroundColor 雪球颜色 token
- 文字相关：f: font size fw: font weight lh: line hight cl: color ls: letter spacing DIN： din 字体
- 同时支持 style，可传其他样式

Demo:

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { Box } from 'snowbox';

export default () => (
  <Box bg="Blu011">
    <Box m={20} p={20} flex={1} bg="Blu014" bw={1} bc="Blu010">
      <Box c h={100} bg="Blu010" w="100%" DIN>
        Box 盒子模型
      </Box>
    </Box>
  </Box>
);
```

<API></API>

## 颜色

按照雪球设计颜色规范，提供颜色简写，编辑器提示，自动适配日夜间模式。将 UI 颜色和规范进行收敛控制，实现多主题切换，并用语义化的描述。

比如雪球设计规范中：

- T010: 一级文字颜色
- B010: 一级背景颜色，同时包含日夜间主题的颜色。

Demo:

```tsx
import React from 'react';
import { Box, Txt } from 'snowbox';

export default () => (
  <Box col m={10} p={10} br={10} bg="B020">
    <Box f={20} mb={10} cl="T010" DIN>
      颜色
    </Box>
    <Box m={5} cl="T020" DIN>
      cl: color . bg: backgroundColor
    </Box>
    <Box>
      <Box c m={5} w={50} cl="T010" DIN>
        T010
      </Box>
      <Box c m={5} w={50} cl="T020" DIN>
        T020
      </Box>
      <Box c m={5} w={50} cl="T030" DIN>
        T030
      </Box>
      <Box c m={5} w={50} cl="T070" DIN>
        T070
      </Box>
      <Box c m={5} w={50} cl="T080" DIN>
        T080
      </Box>
    </Box>
    <Box>
      <Box c m={5} w={50} h={50} bg="Blu010" DIN>
        Blu010
      </Box>
      <Box c m={5} w={50} h={50} bg="Blu011" DIN>
        Blu011
      </Box>
      <Box c m={5} w={50} h={50} bg="Blu014" DIN>
        Blu014
      </Box>
      <Box c m={5} w={50} h={50} bg="Blu015" DIN>
        Blu015
      </Box>
      <Box c m={5} w={50} h={50} bg="Blu016" DIN>
        Blu016
      </Box>
    </Box>
    <Box>
      <Box c col m={5} w={50} h={50} bg="B020">
        <Box c cl="T040" DIN>
          T040
        </Box>
        <Box c cl="T010" DIN>
          B020
        </Box>
      </Box>
      <Box c col m={5} w={50} h={50} bg="B010">
        <Box c cl="T060" DIN>
          T060
        </Box>
        <Box c cl="T060" DIN>
          B010
        </Box>
      </Box>
      <Box c m={5} w={50} h={50} bg="B030">
        <Txt cl="T070" DIN>
          T070
        </Txt>
      </Box>
      <Box c m={5} w={50} h={50} bg="B040">
        <Txt cl="T080" DIN>
          T080
        </Txt>
      </Box>
      <Box c m={5} w={50} h={50} bg="B020">
        <Txt cl="Gld010" DIN>
          Gld010
        </Txt>
      </Box>
    </Box>
  </Box>
);
```

## 定位

ab

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { Box, Txt } from 'snowbox';

export default () => (
  <Box col m={10} p={10} br={10} bg="B020" h={160}>
    <Box f={20} cl="T010" DIN>
      定位
    </Box>
    <Box m={5} cl="T020" DIN>
      ab: 绝对定位 . l: left . r: right . t: top . b: bottom
    </Box>
    <Box col mt={10}>
      <Box w={50} h={50} bg="Blu010" />
      <Box ab l={10} t={10} w={50} h={50} bg="Blu014" />
      <Box ab l={20} t={20} w={50} h={50} bg="Blu011" />
    </Box>
  </Box>
);
```

## 屏幕适配

屏幕适配系统

样式组件系统，所有的尺寸样式自带屏幕适配，无需给每个样式写屏幕适配代码。

比如设计稿中以 iPhone8 375 为基准。

只需写 `<Box m={20} p={20} f={14} />`
