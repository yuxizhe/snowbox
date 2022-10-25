---
nav:
  title: Components
  path: /components
# mobile: false
group:
  title: Components
---

# Svg

snowbox-ui 封装的 SVG 组件，web 端同原生，客户端参考`react-native-svg`组件

Demo

```jsx
import React from 'react';
import { SVG } from 'snowbox-ui';
const { Svg, Circle } = SVG;

const Demo = () => {
  return (
    <Svg>
      <Circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
    </Svg>
  );
};
export default Demo;
```
