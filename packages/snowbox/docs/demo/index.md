---
nav:
  title: Demo
  path: /demo
  order: 0
# mobile: false
---

# snowbox demo

Demo:

```tsx
import React from 'react';
import { Box, Txt } from 'snowbox';

export default () => (
  <Box col bg="B010">
    <Box col m={10} p={10} br={10} bg="B020">
      <Box f={20} mb={10} cl="T010" DIN>
        Box
      </Box>
      <Box bg="Blu011">
        <Box m={20} p={20} flex={1} bg="Blu014" bw={1} bc="Blu010">
          <Box c h={50} bg="Blu010" w="100%" DIN>
            Box 盒子模型
          </Box>
        </Box>
        <Box ab t={0} l="47%" cl="T040">
          mt
        </Box>
        <Box ab t={20} l="47%" cl="T030">
          pt
        </Box>
        <Box ab b={0} l="47%" cl="T040">
          mb
        </Box>
        <Box ab b={20} l="47%" cl="T030">
          pb
        </Box>
        <Box ab l={2} t={55} cl="T040">
          ml
        </Box>
        <Box ab l={23} t={55} cl="T030">
          pl
        </Box>
        <Box ab r={2} t={55} cl="T040">
          mr
        </Box>
        <Box ab r={23} t={55} cl="T030">
          pr
        </Box>
      </Box>
      <Box m={5} cl="T020" DIN>
        w: width . h: height . p: padding . m: margin
      </Box>
      <Box m={5} cl="T020" DIN>
        c: center 居中 . col: 竖排列 . flex: 弹性
      </Box>
      <Box m={5} cl="T020" DIN>
        margin: m . mx . my . mt . mr . ml . mb
      </Box>
      <Box m={5} cl="T020" DIN>
        padding: p . px . py . pt . pr . pl . pb
      </Box>
      <Box m={5} cl="T020" DIN>
        border: br:borderRadius . bw:widht . bc:color
      </Box>

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
    <Box col m={10} p={10} br={10} bg="B020">
      <Box f={20} mb={10} cl="T010" DIN>
        Txt 文字
      </Box>
      <Box m={5} cl="T020" DIN>
        f: fontSize . fw: fontWeight . lh: lineHeight . cl: color
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
  </Box>
);
```
