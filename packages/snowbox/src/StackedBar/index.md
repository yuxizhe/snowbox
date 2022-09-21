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

- 各科目的percent传值为0~100之间，小于1的科目会按1%进行绘制
- 所有科目占比总和大于100或者小于100的，均会按比例撑满容器

Demo:

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { Box, StackedBar } from 'snowbox';

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
        }
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
          percent: 0.4
        }
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
          percent: 38.64
        }
      ]}
    />
  </Box>
)

export default StackedBarDemo;
```

<API></API>
