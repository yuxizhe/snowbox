---
nav:
  title: Components
  path: /components
mobile: true
group:
  title: Components
  order: 2
---

# StackedBar 堆叠柱状条

堆叠柱状条，适用于展示基金资产配置占比或者其他占比

- 各科目的 percent 传值为 0~100 之间，小于 1 的科目会按 1%进行绘制
- 所有科目占比总和大于 100 或者小于 100 的，均会按比例撑满容器

Demo:

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { Box, StackedBar } from 'snowbox-ui';

const StackedBarDemo = () => (
  <Box col m={10} p={10} br={10} bg="B020" flex={1} style={{ rowGap: 16 }}>
    <Box f={20} cl="T010" DIN>
      堆叠柱状条
    </Box>
    <StackedBar
      data={[
        {
          color: 'Chart009',
          percent: 100,
        },
      ]}
    />
    <StackedBar
      data={[
        {
          color: 'Chart009',
          percent: 69.12,
        },
        {
          color: 'Chart001',
          percent: 12.12,
        },
        {
          color: 'Chart006',
          percent: 12.12,
        },
        {
          color: 'Chart008',
          percent: 0.4,
        },
      ]}
    />
    <StackedBar
      height={8}
      data={[
        {
          color: 'Chart009',
          percent: 69.12,
        },
        {
          color: 'Chart006',
          percent: 22.12,
        },
        {
          color: 'Chart008',
          percent: 38.64,
        },
      ]}
    />
  </Box>
);

export default StackedBarDemo;
```

<API></API>
