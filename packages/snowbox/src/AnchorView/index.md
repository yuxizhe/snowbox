---
nav:
  title: Components
  path: /components
group:
  title: Components
  order: 2
---

# AnchorView 锚点视图

AnchorView 组件，解决 RN 同构 h5 接口异步请求结束重新渲染后，View 组件 onLayout 事件没有触发的问题。

Demo

```tsx
import React, { useState, useEffect } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import { Box, TabsAnchor, AnchorView } from 'snowbox-ui';

export default () => {
  const [content1, setContent1] = useState('');
  const [content2, setContent2] = useState('');
  const [height1, setHeight1] = useState([0, 0]);
  const [height2, setHeight2] = useState([0, 0]);

  useEffect(() => {
    const time1 = setTimeout(() => {
      setContent2('AnchorView2重新渲染了');
    }, 1000);
    const time2 = setTimeout(() => {
      setContent1('AnchorView1重新渲染了');
    }, 2000);
    return () => {
      clearTimeout(time1);
      clearTimeout(time2);
    };
  }, []);

  const setAnchorHeight = (e: LayoutChangeEvent, index: number) => {
    if (index === 0) {
      setHeight1(e.nativeEvent.layout.y);
    } else if (index === 1) {
      setHeight2(e.nativeEvent.layout.y);
    }
  };

  return (
    <Box col>
      <AnchorView onLayout={(e) => setAnchorHeight(e, 0)} style={{ backgroundColor: '#eee' }}>
        <Box p={20}>{`AnchorView1 距顶部距离${height1}`}</Box>
        {content1 ? (
          <Box px={20} h={100} cl="T030" style={{ alignItems: 'flex-start' }}>
            {content1}
          </Box>
        ) : null}
      </AnchorView>
      <AnchorView onLayout={(e) => setAnchorHeight(e, 1)}>
        <Box px={20}>{`AnchorView2 距顶部距离${height2}`}</Box>
        {content2 ? (
          <Box px={20} cl="T030" style={{ alignItems: 'flex-start' }}>
            {content2}
          </Box>
        ) : null}
      </AnchorView>
    </Box>
  );
};
```

<API></API>
