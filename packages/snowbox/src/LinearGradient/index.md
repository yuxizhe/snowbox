---
nav:
  title: Components
  path: /components
group:
  title: Components
  order: 2
---

# LinearGradient 渐变

native:

> https://github.com/react-native-linear-gradient/react-native-linear-gradient#readme

web:

> https://github.com/react-native-web-community/react-native-web-linear-gradient

Demo

```tsx
import React from 'react';
import { Box, LinearGradient, Txt } from 'snowbox';

export default () => (
  <Box flex={1} h={300} p={15} col>
    <Box flex={1} h={100} p={15}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={{ flex: 1, height: '100%' }}
      >
        <Txt cl="TBlu016" style={{ textAlign: 'center' }}>
          Horizontal
        </Txt>
      </LinearGradient>
    </Box>
    <Box flex={1} h={100} p={15}>
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{ flex: 1, height: '100%' }}>
        <Txt cl="TBlu016" style={{ textAlign: 'center' }}>
          Vertical
        </Txt>
      </LinearGradient>
    </Box>
  </Box>
);
```

<API src="./index.native.js"></API>
