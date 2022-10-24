---
nav:
  title: Components
  path: /components
mobile: true
group:
  title: Components
  order: 2
---

# Popup 弹窗

盒子组件

用于广告、通知等强提示类的通知弹窗

Demo:

```tsx
/**
 * defaultShowCode: true
 */
import React, { useState } from 'react';
import { Popup, Box, Txt, Button } from 'snowbox-ui';

export default () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupVisible1, setPopupVisible1] = useState(false);

  return (
    <Box pt={20} col>
      <Button
        onPress={() => {
          setPopupVisible(true);
        }}
      >
        展示默认Popup
      </Button>
      <Button
        mt={20}
        onPress={() => {
          setPopupVisible1(true);
        }}
      >
        展示关闭动画
      </Button>
      <Popup
        visible={popupVisible}
        onClose={() => {
          setPopupVisible(false);
        }}
      >
        <Box bg="B020" w="100%" h="100%" col px={20}>
          <Txt lh={50}>默认配置：</Txt>
          <Txt lh={50}>w: 280 h: 378</Txt>
          <Txt lh={50}>show动画：打开 hide动画：关闭</Txt>
        </Box>
      </Popup>
      <Popup
        visible={popupVisible1}
        onClose={() => {
          setPopupVisible1(false);
        }}
        showHideAnimation={true}
      >
        <Box bg="blue010" w="100%" h="100%" col px={20}>
          content
        </Box>
      </Popup>
    </Box>
  );
};
```

<API></API>
