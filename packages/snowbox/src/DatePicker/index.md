---
nav:
  title: Components
  path: /components
mobile: false
group:
  title: 基础组件
  order: 1
---

# DatePicker

时间选择组件弹窗

Demo:

```tsx
/**
 * defaultShowCode: true
 */
import React, { useState } from 'react';
import { Box, DatePicker, Button } from 'snowbox';

const [visible, setVisible] = useState(false);

export default () => (
<Box col m={10} p={10} br={10} bg="B020" style={{overflow: 'hidden'}}>
  <Button onPress={() => setVisible(true)}>点击唤起时间选择组件</Button>
  <DatePicker
    visible={visible}
    tip="DatePicker 组件"
    onRequestClose={() => setVisible(false)}
    onCloseIconClick={() => setVisible(false)}
    onFooterClick={() => setVisible(false)}
  />
</Box>

);
```

<API></API>
