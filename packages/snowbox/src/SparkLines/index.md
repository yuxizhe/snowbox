---
nav:
  title: Components
  path: /components
# mobile: false
group:
  title: Components
---

# SparkLines 简易曲线图

简易曲线图组件，支持配置多条 line 曲线合 baseline 基准线

两条曲线情况下可以直接用`data`属性传入数据即可， 组件自带默认样式，如果需要配置多条曲线或者基准线，或者需要自定义属性，比如线条颜色，宽度，圆角等，可以使用`config`属性,使用 props 属性传入原生 svg`polyline`或者`line`组件支持的属性即可。

Demo:

```tsx
import React, { FC, useEffect, useState } from 'react';
import { Box, SparkLines } from 'snowbox-ui';
import { demo_line1, demo_line2 } from './demoData';

const SparkLine = () => {
  const [config, setconfig] = useState<any>([]);

  useEffect(() => {
    const temp_a = [
      {
        type: 'polyline',
        sourcedata: demo_line1,
        props: {
          stroke: 'green',
          strokeWidth: 1.5,
          strokeLinejoin: 'round',
        },
      },
      {
        type: 'polyline',
        sourcedata: demo_line2,
        props: {
          stroke: '#AAAAAA',
          strokeWidth: 1,
          strokeLinejoin: 'round',
        },
      },
      {
        type: 'baseline',
        benchmarkpoint: '-0.204',
        props: {
          strokeDasharray: [2, 2],
        },
      },
    ];
    setconfig(temp_a);
  }, []);

  return (
    <Box col m={10} p={10} br={10} bg="B020" flex={1} style={{ flexDirection: 'row' }}>
      <Box>
        <SparkLines data={[demo_line1]} />
      </Box>
      <Box ml={12}>
        <SparkLines data={[demo_line1, demo_line2]} />
      </Box>
      <Box ml={12}>
        <SparkLines config={config} />
      </Box>
    </Box>
  );
};

export default SparkLine;
```

<API></API>
