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
import { Box, Button } from 'snowbox-ui';
import Config from './config.ts';

export default () => (
  <Box col m={10} p={10} br={10} bg="B020">
    <Box f={20} m={10} cl="T010" DIN>
      无角标
    </Box>
    <Contributor name="jinmengxian" showBadge={false} />
    <Box f={20} m={10} cl="T010" DIN>
      中文名识别
    </Box>
    <Contributor username="远航" size={30} />
    <Box f={20} m={10} cl="T010" DIN>
      工号识别，换颜色展示
    </Box>
    <Contributor companyID="XQ1299" size={40} bageSet={{ bg: 'TPur3' }} badgeCount="CC" />
    <Box f={20} m={10} cl="T010" DIN>
      邮箱识别
    </Box>
    <Contributor email="test@gmail.com" />
    <Box f={20} m={10} cl="T010" DIN>
      ALL
    </Box>
    <Box flex={1} style={{ flexWrap: 'wrap' }}>
      {Object.keys(Config).map((item) => (
        <Contributor name={item} mr={20} mt={15} size={50} />
      ))}
    </Box>
  </Box>
);
```

<API></API>
