---
nav:
  title: Components
  path: /components
mobile: false
group:
  title: Components
  order: 2
---

## PieChart

PieChart 饼图组件，可绘制基础饼图及圆环图(中间有可显示额外文字等信息空余部分的饼图)。

> 支持配置
>
> - 设置数据及百分比
> - 饼图半径/内圆半径
> - 饼图/内圆颜色
> - 图标大小

### Demo

```tsx
import React from 'react';
import { Box, PieChart, ThemeColor, SVGText } from 'snowbox';

export default () => (
  <Box col m={10} p={10} br={10} bg="B020">
    <Box f={20} cl="T010" DIN>
      PieChart
    </Box>
    <Box flex={1}>
      <Box pt={20} pb={20} flex={1} c>
        <PieChart
          data={[
            { percent: 0.6, color: ThemeColor.Chart009.day },
            { percent: 0.25, color: ThemeColor.Chart006.day },
            { percent: 0.15, color: ThemeColor.Chart007.day },
          ]}
          width={108}
          height={108}
        />
      </Box>
    </Box>
  </Box>
);
```

<API></API>
