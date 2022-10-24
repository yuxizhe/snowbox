---
nav:
  title: Components
  path: /components
# mobile: false
group:
  title: Components
  order: 2
---

# Modal 确认弹框

弹窗组件

支持提示窗、确认窗两种样式弹窗。

Demo:

```tsx
import React, { useState } from 'react';
import { Box, Button, Modal } from 'snowbox-ui';

const [modalVisible, setModalVisible] = useState(false);

export default () => (
  <Box col m={10} p={10} br={10} bg="B020">
    <Box f={20} cl="T010" DIN>
      Modals
    </Box>
    <Box>
      <Button c m={10} onPress={() => setModalVisible(true)} DIN>
        open
      </Button>
    </Box>

    <Modal
      visible={modalVisible}
      onCancel={() => setModalVisible(false)}
      onOk={() => setModalVisible(false)}
      modalTitle="我是标题最多十三字不可折行"
      modalDesc="我是对话框正文，支持多行，建议显示文案在三行以内，折行后文案左对齐展示"
    />
  </Box>
);
```

<API></API>
