---
nav:
  title: Components
  path: /components
# mobile: false
group:
  title: Components
  order: 4
---

# Contributer 贡献者

贡献者组件封装

```tsx
import Contributor from './index';
import React, { useState } from 'react';
import { Box, Button } from 'snowbox';
import { config } from './config.ts';

export default () => (
  <Box col m={10} p={10} br={10} bg="B020">
    <Box f={20} m={10} cl="T010" DIN>
      有角标
    </Box>
    <Contributor name="mengxian" />
    <Box f={20} m={10} cl="T010" DIN>
      无角标
    </Box>
    <Contributor name="xiaoer" showBadge={false} size={30} />
    <Box f={20} m={10} cl="T010" DIN>
      有角标，换颜色展示
    </Box>
    <Contributor name="loudan" size={40} bageSet={{ bg: 'TPur3' }} />
    <Box f={20} m={10} cl="T010" DIN>
      ALL
    </Box>
    <Box flex={1} style={{ flexWrap: 'wrap' }}>
      {Object.keys(config).map((item) => (
        <Contributor name={item} mr={20} mt={15} size={30} />
      ))}
    </Box>
  </Box>
);
```

<API></API>
