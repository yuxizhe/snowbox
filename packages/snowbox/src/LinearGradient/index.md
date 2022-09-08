---
nav:
  title: Components
  path: /components
mobile: false
group:
  title: Components
  order: 2
---

# LinearGradient

> ## Readme：
>
> https://github.com/react-native-linear-gradient/react-native-linear-gradient#readme

### Demo

```tsx
import React from 'react';
import { Box, LinearGradient } from 'snowbox';

export default () => (
  <Box flex={1} h={100} p={15}>
    <Box flex={1} h={100} p={15}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={{ flex: 1, height: '100%' }}
      />
    </Box>
  </Box>
);
```
