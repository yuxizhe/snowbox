---
nav:
  title: Components
  path: /components
mobile: true
group:
  title: Components
  order: 2
---

# Steps 步骤条

引导用户按流程完成任务的步骤条

Demo:

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { Steps, Box, Txt } from 'snowbox-ui';

export default () => (
  <Box col m={10} p={10} br={10} bg="B020">
    <Box f={20} cl="T010" DIN mb={10}>
      Steps
    </Box>
    <Box mt={10} DIN cl="T020">
      成功态
    </Box>
    <Box pt={10} pl={10}>
      <Steps
        data={[
          {
            name: '支付成功',
            desc: '2022-05-16 12:05',
            status: 'success',
          },
          {
            name: '冷静期回访',
            desc: '2022-05-17 15:00前',
            status: 'waiting',
          },
          {
            name: '查询收益',
            desc: <Txt cl="Org010">该笔申购订单未确认金额200.00元</Txt>,
            status: 'stay',
          },
        ]}
      />
    </Box>
    <Box mt={10} DIN cl="T020">
      失败态
    </Box>
    <Box pt={10} pl={10}>
      <Steps
        data={[
          {
            name: '支付失败',
            desc: '汇款已过支付期限',
            status: 'fail',
          },
        ]}
      />
    </Box>
  </Box>
);
```

<API></API>
