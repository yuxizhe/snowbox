---
nav:
  title: Components
  path: /components
# mobile: false
group:
  title: Components
  order: 2
---

# Button 按钮

文字组件

支持字号、字重、颜色、雪球常用 DIN 字体等，封装行内占位，三端差异抹平等等常用功能。

Demo:

```tsx
import React from 'react';
import { Box, Button } from 'snowbox';

export default () => (
  <Box col m={10} p={10} br={10} bg="B020">
    <Box f={20} mb={10} cl="T010" DIN>
      Button
    </Box>
    <Box>
      <Button onPress={(e) => console.log(e)} mr={17}>
        主要按钮
      </Button>
      <Button onPress={(e) => console.log(e)} disabled>
        主按钮禁用
      </Button>
    </Box>
    <Box mt={5}>
      <Button onPress={(e) => console.log(e)} type="secondary" mr={17}>
        次要按钮
      </Button>
      <Button onPress={(e) => console.log(e)} type="secondary" disabled>
        次按钮禁用
      </Button>
    </Box>
    <Box mt={5}>
      <Button onPress={(e) => console.log(e)} type="white" mr={17}>
        白底按钮
      </Button>
      <Button onPress={(e) => console.log(e)} type="white" disabled>
        白底禁用
      </Button>
    </Box>
    <Box mt={5} />
    <Box mt={5}>
      <Box flex={1} mr={17}>
        <Button onPress={(e) => console.log(e)} size="m" mr={17}>
          发布
        </Button>
        <Button onPress={(e) => console.log(e)} size="m" disabled>
          未发布
        </Button>
      </Box>
      <Box flex={1}>
        <Button onPress={(e) => console.log(e)} size="s" mr={17}>
          发布
        </Button>
        <Button onPress={(e) => console.log(e)} size="s" disabled>
          未发布
        </Button>
      </Box>
    </Box>
  </Box>
);
```

<API></API>
