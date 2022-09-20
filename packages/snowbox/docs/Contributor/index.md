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
import { imageAddress } from '../Constant.js';

export default () => (
  <Box col m={10} p={10} br={10} bg="B020">
    <Box f={20} m={10} cl="T010" DIN>
      有角标
    </Box>
    <Contributor imageAddress={imageAddress} />
    <Box f={20} m={10} cl="T010" DIN>
      无角标
    </Box>
    <Contributor imageAddress={imageAddress} showBadge={false} size={30} />
    <Box f={20} m={10} cl="T010" DIN>
      有角标，换颜色展示
    </Box>
    <Contributor imageAddress={imageAddress} size={40} bageSet={{ bg: 'TPur3' }} />
  </Box>
);
```

<API></API>
