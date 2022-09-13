---
nav:
  title: Components
  path: /components
mobile: false
group:
  title: Components
  order: 2
---

# Icon 图标

图标组件

<API></API>

Demo: 支持点击复制

```tsx
/**
 * defaultShowCode: true
 */
import React, { useState, useEffect } from 'react';
import { Clipboard, Alert } from 'react-native';
import { Box, Icon, Press, Popup, Txt } from 'snowbox';
import iconConfig from './icon';

export default () => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('light');
  const setString = (item) => {
    const success = Clipboard.setString(`<Icon type="${item}"/>`);
    setText(`<Icon type="${item}"/>`);
    setTimeout(() => setVisible(true), 0);
    setTimeout(() => {
      setVisible(false);
    }, 700);
  };
  return (
    <Box col m={10} p={10} br={10} bg="B020">
      <Box f={20} mb={10} cl="T010" DIN>
        Icon
      </Box>

      <Box flex={1} style={{ flexWrap: 'wrap' }}>
        {Object.keys(iconConfig).map((item) => (
          <Box
            m={20}
            col
            style={{ alignItems: 'center' }}
            w={150}
            bg={item === 'icon_s_whiteHook' ? 'B050' : 'B020'}
            br={10}
          >
            <Press onPress={() => setString(item)}>
              <Icon type={item} w={30} h={30} />
            </Press>
            <Box ml={10} cl="T020">
              {item}
            </Box>
          </Box>
        ))}
        <Popup visible={visible} showCloseIcon={false}>
          <Box bg="B020" w={300} flex={1} col c>
            <Box flex={1} c m={10}>
              <Icon type="icon_s_hook" />
              复制成功
            </Box>
            <Box flex={1} c m={10}>
              {text}
            </Box>
          </Box>
        </Popup>
      </Box>
    </Box>
  );
};
```
