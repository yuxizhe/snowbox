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

> 备注：推荐点右下角的小角标在新浏览器页打开查看

```jsx
import React, { useEffect, useState } from 'react';
import { Box, errorBoundary, Card, TabScrollView, Empty } from 'snowbox';

export default () => {
  const [data, setData] = useState([
    { title: '分红详解' },
    { title: '策略补充' },
    { title: '团队介绍' },
    { title: '雪球资管' },
    { title: '其他' },
  ]);
  const titles = data.map((item) => item.title);

  const tab = 0;

  return (
    <TabScrollView titles={titles} initTab={tab}>
      {data.map((item, index) => (
        <Box>
          <Card titlePb={16} title={item.title}>
            <Box h={300}>content</Box>
          </Card>
        </Box>
      ))}
    </TabScrollView>
  );
};
```

<API></API>
