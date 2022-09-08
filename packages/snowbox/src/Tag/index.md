---
nav:
  title: Components
  path: /components
# mobile: false
group:
  title: Components
  order: 4
---

# Tag

标签组件

支持自定义颜色及背景，两种尺寸可选

Demo:

```tsx
import React from 'react';
import { Tag, Box, Icon } from 'snowbox';

export default () => (
  <Box col m={10} p={10} br={10} bg="B020">
    <Box f={20} cl="T010" DIN>
      Tag
    </Box>
    <Box col mt={10}>
      <Box>
        <Box m={5}>
          <Tag>大号标签</Tag>
        </Box>
        <Box m={5}>
          <Tag bg="Pur030" cl="Pur010" onPress={() => console.log('点击')}>
            点击带icon标签
            <Box ml={4}>
              <Icon type="icon_s_rightshift_day" w={5} h={6} />
            </Box>
          </Tag>
        </Box>
      </Box>
      <Box>
        <Box m={5}>
          <Tag size="s">小号标签</Tag>
        </Box>
        <Box m={5}>
          <Tag size="s" bg="Pur030" cl="Pur010">
            小号标签
          </Tag>
        </Box>
      </Box>
    </Box>
  </Box>
);
```

<API></API>
