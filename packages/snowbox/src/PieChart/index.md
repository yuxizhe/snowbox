---
nav:
  title: Components
  path: /components
group:
  title: Components
  order: 2
---

## PieChart 饼图

PieChart 饼图组件，可绘制基础饼图及圆环图(中间有可显示额外文字等信息空余部分的饼图)。

支持配置

- 设置数据及百分比
- 饼图半径/内圆半径
- 饼图/内圆颜色
- 图标大小

Demo

```tsx
import React from 'react';
import { Box, PieChart, ThemeColor, SVG } from 'snowbox';
const { Text: SVGText } = SVG;

export default () => (
  <Box col m={10} p={10} br={10} bg="B020">
    <Box f={20} cl="T010" DIN>
      基础饼图
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
    <Box f={20} cl="T010" DIN>
      同心圆饼图
    </Box>
    <Box pt={20} pb={20} flex={1} c>
      <PieChart
        data={[
          { percent: 0.35, color: ThemeColor.Chart001.day },
          { percent: 0.25, color: ThemeColor.Chart002.day },
          { percent: 0.15, color: ThemeColor.Chart003.day },
          { percent: 0.25, color: ThemeColor.Chart008.day },
        ]}
        width={108}
        height={108}
        innerCircleRadius={28}
        renderCenterChildComponent={(centerX, centerY) => (
          <SVGText
            x={centerX}
            y={centerY}
            fill={ThemeColor.T010.day}
            fontSize={12}
            textAnchor="middle"
            alignmentBaseline="central"
          >
            组合持仓
          </SVGText>
        )}
      />
    </Box>
  </Box>
);
```

<API></API>
