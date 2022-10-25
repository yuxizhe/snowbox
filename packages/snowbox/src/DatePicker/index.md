---
nav:
  title: Components
  path: /components
mobile: false
group:
  title: Components
---

# DatePicker 日期选择

日期选择组件弹窗

Demo:

```tsx
/**
 * defaultShowCode: true
 */
import React, { useState } from 'react';
import { Box, DatePicker, Button } from 'snowbox-ui';

export default () => {
  const [visible, setVisible] = useState(false);
  return (
    <Box m={10} p={10} br={10} bg="B020">
      <Box>
        <Button size="m" onPress={() => setVisible(true)}>
          点击唤起时间选择组件
        </Button>
      </Box>
      <DatePicker
        visible={visible}
        tip="DatePicker 组件"
        onRequestClose={() => setVisible(false)}
        onCloseIconClick={() => setVisible(false)}
        onFooterClick={() => setVisible(false)}
      />
    </Box>
  );
};
```

<API></API>
