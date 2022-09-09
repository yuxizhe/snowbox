---
nav:
  title: Components
  path: /components
mobile: true
group:
  title: Components
  order: 4
---

# Press 点击

通用点击封装，默认会扩展触摸区域

Demo:

```tsx
/**
 * defaultShowCode: true
 */
import React, { useState } from 'react';
import { Box, Press } from 'snowbox';

export default () => (
  <Box col m={10} p={10} br={10} bg="B020">
    <Box>
      <Press onPress={() => console.log('click')}>
        <Box bg="Blu010" px={38} py={11} br={5}>
          Press
        </Box>
      </Press>
      <Press m={10} bg="Blu014" onPress={() => console.log('click')}>
        press
      </Press>
      <Press cl="T010" onPress={() => console.log('click')}>
        press
      </Press>
    </Box>
  </Box>
);
```

<API></API>
