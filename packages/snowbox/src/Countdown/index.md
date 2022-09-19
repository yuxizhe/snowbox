---
nav:
  title: Components
  path: /components
# mobile: false
group:
  title: Components
  order: 2
---

# Countdown 倒计时

倒计时组件

支持配置

- 起始时间 initSeconds

- 描述文字 desc

- 结束回调 onEnd

Demo

```tsx
import React from 'react';
import { Countdown, Box } from 'snowbox';

export default () => (
  <Box col m={10} p={10}>
    <Box f={20} mb={20} cl="T010">
      Countdown
    </Box>
    <Box c>
      <Countdown onEnd={() => console.log('end')} desc="查询中，请稍后..." initSeconds={10} />
    </Box>
  </Box>
);
```

<API></API>
