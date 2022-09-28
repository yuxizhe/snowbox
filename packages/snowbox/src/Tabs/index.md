---
nav:
  title: Components
  path: /components
mobile: true
group:
  title: Components
  order: 2
---

# Tabs 标签页

盒子组件

当前内容需要分成同层级结构的组，进行内容切换展示，常用在表单或者列表的顶部。

可设置`tabBarScroll`属性来使 tab 左排列，且超出屏幕宽度滚动

```
备注： demo展示效果为web端效果，相对于native版本缺少以下功能
- 内容部分滑动切换
- 导航条支持状态切换，内容超长默认缩放，可切换横向滑动选择的模式
```

Demo:

```tsx
/**
 * defaultShowCode: true
 */
import React, { useState } from 'react';
import { Tabs, Box } from 'snowbox';

export default () => {
  return (
    <Box col>
      <Tabs startIndex={1} title={['第一个', '第二个', '第三个']} onChange={(e) => console.log(e)}>
        <Box c w="100%" h={200} bg="Blu014" br={10}>
          第一个tab
        </Box>
        <Box c w="100%" h={200} bg="Blu010" br={10}>
          第二个tab
        </Box>
        <Box c w="100%" h={200} bg="B030" br={10}>
          第三个tab
        </Box>
      </Tabs>
      <Tabs tabBarScroll startIndex={1} title={['第一个', '第二个', '第三个']} onChange={(e) => console.log(e)}>
        <Box c w="100%" h={200} bg="Blu014" br={10}>
          第一个tab
        </Box>
        <Box c w="100%" h={200} bg="Blu010" br={10}>
          第二个tab
        </Box>
        <Box c w="100%" h={200} bg="B030" br={10}>
          第三个tab
        </Box>
      </Tabs>
    </Box>
  );
};
```

<API></API>
