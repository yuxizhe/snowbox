---
nav:
  title: Components
  path: /components
# mobile: false
group:
  title: Components
  order: 4
---

# Badge 徽标数

徽标组件

默认位置为右上角，支持自定义颜色、徽标偏移量，是否展示封顶数字、为零是否展示等。

Demo:

```tsx
import React from 'react';
import { Badge, Box, Icon } from 'snowbox-ui';

export default () => (
  <Box col m={10} p={10} br={10} bg="B020">
    <Box f={20} cl="T010" DIN>
      Badge
    </Box>
    <Box col mt={10}>
      <Box>
        <Box m={5}>
          <Badge count={5}>
            <Icon type="icon_s_module_loading" w={24} h={24} />
          </Badge>
        </Box>
        <Box m={10}>
          <Badge count={200}>
            <Icon type="icon_s_module_loading" w={24} h={24} />
          </Badge>
        </Box>
        <Box my={10} mx={20}>
          <Badge count={'右移中文角标'} offset={[20, 0]}>
            <Icon type="icon_s_module_loading" w={24} h={24} />
          </Badge>
        </Box>
      </Box>
      <Box>
        <Box m={5}>
          <Badge count={5}></Badge>
        </Box>
        <Box m={5}>
          <Badge count={100}></Badge>
        </Box>
        <Box m={5}>
          <Badge count={'单独使用的中文角标'}></Badge>
        </Box>
      </Box>
    </Box>
  </Box>
);
```

<API></API>
