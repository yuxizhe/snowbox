---
nav:
  title: Components
  path: /components
mobile: true
group:
  title: Components
  order: 2
---

# LottieAnimate

用于加载 json 格式的动画

Demo:

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { LottieAnimate, Box, Txt } from 'snowbox';
import day from '../Loading/loading_gray_day';
import night from '../Loading/loading_gray_night';

const LOADING_ANIMATION = {
  day,
  night,
};

export default () => (
  <Box col p={30}>
    <Txt>展示一个loading动画</Txt>
    <LottieAnimate w={20} h={20} dataSource={LOADING_ANIMATION} />
  </Box>
);
```

<API></API>
