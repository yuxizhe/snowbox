---
nav:
  title: Components
  path: /components
mobile: true
group:
  title: Components
  order: 2
---

# TimeAxis 时间轴

用于展示重点时间节点或时间段的信息提示组件

Demo:

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { TimeAxis, Box, Txt } from 'snowbox-ui';

export default () => (
  <Box col m={10} p={10} br={10} bg="B020">
    <Box f={20} cl="T010" DIN mb={10}>
      TimeAxis 时间轴
    </Box>
    <TimeAxis
      contentList={[
        {
          baseText: '享现金宝收益',
          leftText: '募集期',
          leftTime: '08.15 09:30 - 08.20 09:30',
          boxProps: { flex: 3 },
          leftTimeProps: { cl: 'T020' },
        },
        {
          baseText: '预期首次分红时长12个月',
          leftText: '买入日',
          leftTime: '08.15 09:30',
          rightText: '预期首次分红',
          rightTime: '08.15 09:30',
          boxProps: { flex: 4 },
          leftTimeProps: { cl: 'T020' },
        },
      ]}
    />

    <Box col>
      <TimeAxis
        contentList={[
          {
            baseText: 'baseText boxProps: {}',
            leftText: 'leftText leftTextProps:{}',
            leftTime: 'leftTime leftTimeProps:{}',
            rightText: 'rightText rightTextProps:{}',
            rightTime: 'rightTime rightTimeProps:{}',
            boxProps: { flex: 4 },
            leftTextProps: { w: 110 },
            leftTimeProps: { cl: 'T020', f: 10, w: 110 },
            rightTextProps: { style: { textAlign: 'right' } },
            rightTimeProps: { style: { textAlign: 'right' } },
          },
        ]}
      />
    </Box>
  </Box>
);
```

<API exports='["default", "contentProps"]'></API>
