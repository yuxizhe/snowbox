---
nav:
  title: Components
  path: /components
# mobile: false
group:
  title: Components
  order: 3
---

# TabScrollView 带 tab 定位的滚动视图

点击顶部 tab 区域会自动滚动到指定位置，滑动页面时，也会自动计算当前滚动到哪个 tab。

## 使用

顶部 tab 区域：TabScrollView 的 titles 属性，传入一个数组

下方 content 区域：写在 TabScrollView 的内部 顺序与上面的 titles 一一对应

```jsx
import React from 'react';
import { Box, Card, TabScrollView } from 'snowbox-ui';

export default () => {
  const titles = ['分红详解', '策略补充', '团队介绍', '雪球资管', '其他'];

  const tab = 0;

  return (
    <TabScrollView titles={titles} initTab={tab}>
      {titles.map((item, index) => (
        <Box>
          <Card titlePb={16} title={item}>
            <Box h={300}>content</Box>
          </Card>
        </Box>
      ))}
    </TabScrollView>
  );
};
```

<API src="./ScrollView.tsx"></API>
