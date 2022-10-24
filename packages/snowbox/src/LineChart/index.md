---
nav:
  title: Components
  path: /components
# mobile: false
group:
  title: Components
  order: 2
---

# LineChart 曲线图

雪球通用的曲线图组件，支持业绩归因 tag，买入卖出点，阴影，手势滑动触摸等。

```jsx
import React from 'react';
import { LineChart, Box } from 'snowbox-ui';

export default () => {
  return (
    <Box p={12}>
      <LineChart
        data={[
          [
            { date: '2022-01-01', rate: '1.1' },
            { date: '2022-01-02', rate: '1.4', sell: true },
            { date: '2022-01-03', rate: '1.2', buy: true },
          ],
        ]}
        fill={['red']}
        shadowDirection={2}
        hasLabelPercent={true}
      />
    </Box>
  );
};
```

<API></API>
