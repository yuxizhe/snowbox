---
nav:
  title: Components
  path: /components
mobile: true
group:
  title: Components
  order: 2
---

# Guide 功能引导组件

用于新功能提示，或引导用户操作

Demo:

```tsx
/**
 * defaultShowCode: true
 */
import React, { useState } from 'react';
import { Box, ThemeColor, THEME, getSize, Guide, Press, Txt } from 'snowbox-ui';

const positionBtn = {
  w: 100,
  bg: 'T030',
  br: 4,
  py: 4,
};

const GuideDemo = () => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(true);
  const [visible5, setVisible5] = useState(false);
  const [visible6, setVisible6] = useState(false);
  const setAllHide = () => {
    setVisible1(false);
    setVisible2(false);
    setVisible3(false);
    setVisible4(false);
    setVisible5(false);
    setVisible6(false);
  };
  return (
    <Box col m={10} p={10} br={10} bg="B020">
      <Box f={20} cl="T010" DIN mb={20}>
        <Box>Guide 导航提示</Box>
        <Press onPress={setAllHide}>
          <Box ml={50} cl="Blu010">
            关闭所有
          </Box>
        </Press>
      </Box>
      <Box style={{ justifyContent: 'space-around' }} my={20}>
        <Guide visible={visible1} popWidth={200} popContent="提示信息" position="topLeft" popOffsetY={4}>
          <Press
            onPress={() => {
              setAllHide();
              setVisible1(true);
            }}
            {...positionBtn}
          >
            <Txt>topLeft</Txt>
          </Press>
        </Guide>
        <Guide visible={visible2} popWidth={200} popContent="提示信息" position="topCenter" popOffsetY={4}>
          <Press
            onPress={() => {
              setAllHide();
              setVisible2(true);
            }}
            {...positionBtn}
          >
            <Txt>topCenter</Txt>
          </Press>
        </Guide>
        <Guide visible={visible3} popWidth={200} popContent="提示信息" position="topRight" popOffsetY={4}>
          <Press
            onPress={() => {
              setAllHide();
              setVisible3(true);
            }}
            {...positionBtn}
          >
            <Txt>topRight</Txt>
          </Press>
        </Guide>
      </Box>
      <Box style={{ justifyContent: 'space-around' }} mb={20}>
        <Guide
          visible={visible4}
          popWidth={150}
          popProps={{ style: styles.shadow }}
          popContent="提示信息"
          popOffsetY={4}
        >
          <Press
            onPress={() => {
              setAllHide();
              setVisible4(true);
            }}
            {...positionBtn}
          >
            <Txt>bottomLeft</Txt>
          </Press>
        </Guide>
        <Guide
          visible={visible5}
          popWidth={200}
          popBg="T020"
          popContent="提示信息"
          position="bottomCenter"
          popOffsetY={4}
        >
          <Press
            onPress={() => {
              setAllHide();
              setVisible5(true);
            }}
            {...positionBtn}
          >
            <Txt>bottomCenter</Txt>
          </Press>
        </Guide>
        <Guide
          visible={visible6}
          popOffsetY={10}
          popWidth={80}
          popContent="提示信息"
          position="bottomRight"
          popOffsetY={4}
        >
          <Press
            onPress={() => {
              setAllHide();
              setVisible6(true);
            }}
            {...positionBtn}
          >
            <Txt>bottomRight</Txt>
          </Press>
        </Guide>
      </Box>
    </Box>
  );
};

const styles = {
  shadow: {
    shadowColor: ThemeColor.Blu010[THEME],
    shadowOffset: { width: 0, height: getSize(2) },
    shadowOpacity: 0.5,
    shadowRadius: getSize(6),
    elevation: 3,
    zIndex: 1000,
  },
};

export default GuideDemo;
```

<API></API>
