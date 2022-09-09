---
nav:
  title: Components
  path: /components
mobile: false
group:
  title: Components
---

# ContrastBar 对比条

对比条组件

基金胜率对比 或者其他数据对比场景

Demo

```jsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { Box, ContrastBar } from 'snowbox';

const demo = () => (
  <Box col m={10} p={10} br={10} bg="B020" flex={1} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <ContrastBar
      width={70}
      fields={['this_product', 'benchmark_index']}
      data={[
        {
          this_product: '-0.0580',
          benchmark_index: '-0.0872',
        },
        {
          this_product: '-0.0146',
          benchmark_index: '-0.0245',
        },
        {
          this_product: '-0.0894',
          benchmark_index: '-0.0762',
        },
      ]}
    />
    <ContrastBar
      width={70}
      fields={['this_product', 'benchmark_index']}
      data={[
        {
          this_product: '0.0894',
          benchmark_index: '0.0762',
        },
        {
          this_product: '0.0580',
          benchmark_index: '0.0872',
        },
        {
          this_product: '0.0146',
          benchmark_index: '0.0245',
        },
      ]}
    />
    <ContrastBar
      width={70}
      fields={['this_product', 'benchmark_index']}
      data={[
        {
          this_product: '-0.0146',
          benchmark_index: '0.0245',
        },
        {
          this_product: '0.0580',
          benchmark_index: '-0.0872',
        },
        {
          this_product: '-0.0894',
          benchmark_index: '-0.0762',
        },
      ]}
    />
    <ContrastBar
      width={70}
      fields={['this_product', 'benchmark_index', 'third']}
      colors={[undefined, undefined, ['Blu010', 'Ylw010']]}
      data={[
        {
          this_product: '0.0580',
          benchmark_index: '-0.0872',
          third: '0.0238',
        },
        {
          this_product: '-0.0146',
          benchmark_index: '0.0245',
          third: '-0.0238',
        },
        {
          this_product: '-0.0894',
          benchmark_index: '-0.0762',
          third: '0.0338',
        },
      ]}
    />
  </Box>
);

export default demo;
```

## 传参示例

```js
width={70}
fields={['this_product', 'benchmark_index', 'third']}
colors={[undefined, undefined, ['Blu010', 'Ylw010']]}
data={[
  {
    this_product: '0.0580',
    benchmark_index: '-0.0872',
    third: '0.0238',
  },
  {
    this_product: '-0.0146',
    benchmark_index: '0.0245',
    third: '-0.0238',
  },
  {
    this_product: '-0.0894',
    benchmark_index: '-0.0762',
    third: '0.0338',
  },
]}
```

<API>
