---
nav:
  title: Components
  path: /components
# mobile: false
group:
  title: Components
  order: 2
---

# Button

文字组件

可选三种尺寸，三种背景色，可以应用 Box 的全部属性。

Demo:

```tsx
import React, { useState } from 'react';
import { Box, Button } from 'snowbox';

const [loading, setLoading] = useState(false);

export default () => (
  <Box col m={10} p={10} br={10} bg="B020">
    <Box f={20} mb={10} cl="T010" DIN>
      Button
    </Box>
    <Box>
      <Button
        onPress={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 3000);
        }}
        mr={17}
        loading={loading}
        safe
      >
        点击loading
      </Button>
      <Button onPress={(e) => console.log(e)} disabled>
        主按钮禁用
      </Button>
    </Box>
    <Box mt={5}>
      <Button
        onPress={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 3000);
        }}
        type="secondary"
        loading={loading}
        mr={17}
      >
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
        <Button onPress={() => setLoading(true)} loading={loading} size="m" mr={10} safe>
          发布
        </Button>
        <Button onPress={(e) => console.log(e)} size="m" disabled>
          未发布
        </Button>
      </Box>
      <Box flex={1}>
        <Button onPress={() => setLoading(true)} loading={loading} size="s" mr={10} safe>
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
