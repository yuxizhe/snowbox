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

堆叠柱状条，适用于基金持仓占比或者其他占比，小于1%的科目会按1%进行绘制

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
          percent: 69.12,
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
