---
nav:
  title: Components
  path: /components
group:
  title: Components
  order: 2
---

# Swiper 滑动组件

触摸滑动组件,适用于 native 及 web

native + web

> https://github.com/reactrondev/react-native-web-swiper

Demo

```tsx
import React from 'react';
import { Box, Swiper, Txt } from 'snowbox-ui';

export default () => (
  <Box col m={10} p={10} br={10} bg="B020" h={200} col>
    <Box f={20} cl="T010" DIN>
      Swiper
    </Box>
    <Swiper>
      <Box flex={1} c bg="Blu014" br={10}>
        第一个Swiper
      </Box>
      <Box flex={1} c w="100%" h={100} bg="Blu010" br={10}>
        第二个Swiper
      </Box>
      <Box flex={1} c w="100%" h={100} bg="B030" br={10}>
        第三个Swiper
      </Box>
    </Swiper>
    <Swiper
      vertical
      from={1}
      loop
      timeout={2}
      controlsEnabled={false}
      springConfig={{ speed: 11 }}
      minDistanceForAction={0.15}
      containerStyle={{ marginTop: 10 }}
    >
      <Box flex={1} c bg="Blu014" br={10}>
        第一个Swiper
      </Box>
      <Box flex={1} c w="100%" h={100} bg="Blu010" br={10}>
        第二个Swiper
      </Box>
      <Box flex={1} c w="100%" h={100} bg="B030" br={10}>
        第三个Swiper
      </Box>
    </Swiper>
  </Box>
);
```

<API></API>
