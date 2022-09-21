---
hero:
  title: SnowBox
  desc: SnowBox 雪球三端同构组件库 & 样式组件系统
  actions:
    - text: Getting Started
      link: /components
features:
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png
    title: 三端同构
    desc: iOS/Android/H5三端同构，一套代码三端运行。通过组件库封装抹平三端和应用间差异，大幅提升业务开发效率。无需额外开发，可将雪球客户端内容和体验完整复刻同步到微信体系。
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png
    title: 样式组件系统
    desc: 自研实现定制化的样式组件系统，提供样式简化写法，UI 代码量降低 90%。联合设计团队对雪球 Design 设计组件进行工程封装，封装屏幕适配、日夜主题适配等通用样式逻辑。
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png
    title: 重新定义开发方式
    desc: 将门槛从客户端开发降低为web前端开发，可在浏览器通过常规调试方式进行业务逻辑开发、状态管理和接口联调，无需启动模拟器或连接真机。通过组件库简写提升开发体验。
footer: Open-source MIT Licensed | Copyright © 2020<br />Powered by [dumi](https://d.umijs.org)
---

### <center>Contributors</center>

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Box, Txt, Img, Badge, Icon } from 'snowbox';
import Contributor from './Contributor';
import Config from './Contributor/config';

export default () => (
  <Box flex={1} p={20} mt={-15} style={{ flexWrap: 'wrap' }}>
    {Object.keys(Config).map((item) => (
      <Contributor name={item} mr={20} mt={15} size={50} />
    ))}
  </Box>
);
```
