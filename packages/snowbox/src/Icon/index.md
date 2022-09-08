---
nav:
  title: Components
  path: /components
# mobile: false
group:
  title: Components
  order: 2
---

# Icon

图标组件

> 支持配置
>
> - 宽度
> - 高度
> - 图标样式

Demo:

```tsx
import React from 'react';
import { Box, Icon } from 'snowbox';

export default () => (
  <Box col m={10} p={10} br={10} bg="B020">
    <Box f={20} mb={10} cl="T010" DIN>
      Icon
    </Box>
    <Box m={5}>
      <Icon type="icon_s_explain_linear" />
      <Box ml={10} cl="T020">
        icon_s_explain_linear
      </Box>
    </Box>
    <Box m={5}>
      <Icon type="icon_s_unfold" />
      <Box ml={10} cl="T020">
        icon_s_unfold
      </Box>
    </Box>
    <Box m={5}>
      <Icon type="icon_s_popupunfold" />
      <Box ml={10} cl="T020">
        icon_s_popupunfold
      </Box>
    </Box>
    <Box m={5}>
      <Icon type="icon_s_close" />
      <Box ml={10} cl="T020">
        icon_s_close
      </Box>
    </Box>
    <Box m={5}>
      <Icon type="icon_s_more" />
      <Box ml={10} cl="T020">
        icon_s_more
      </Box>
    </Box>
    <Box mt={5}>
      <Icon w={16} h={12} type="icon_s_hook" />
      <Box ml={10} cl="T020">
        icon_s_hook
      </Box>
    </Box>
  </Box>
);
```

<API></API>
