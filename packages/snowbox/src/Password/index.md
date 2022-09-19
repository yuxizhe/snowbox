---
nav:
  title: Components
  path: /components
mobile: true
group:
  title: Components
  order: 2
---

# Password 密码窗

输入密码弹窗组件

Demo:

```tsx
/**
 * defaultShowCode: true
 */
import React, { useState } from 'react';
import { Password, Box, PButton, TxtNum } from 'snowbox';

const [passwordVisible, setPasswordVisible] = useState(false);

export default () => (
  <Box col m={10} p={10} br={10} bg="B020">
    <Box f={20} cl="T010" DIN mb={10}>
      Password
    </Box>
    <Box>
      <PButton c m={10} bg="Blu014" onPress={() => setPasswordVisible(true)}>
        open
      </PButton>
    </Box>
    <Password
      visible={passwordVisible}
      fundName="基金名称"
      amount="100元"
      desc={
        <TxtNum textProps={{ cl: 'T020', f: 12 }} numProps={{ cl: 'T020', f: 12 }}>
          含申购费0.00元
        </TxtNum>
      }
      onInputFinish={(text) => alert(text)}
      onCancel={() => setPasswordVisible(false)}
    />
  </Box>
);
```

<API></API>
