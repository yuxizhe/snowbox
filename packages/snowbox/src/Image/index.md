---
nav:
  title: Components
  path: /components
# mobile: false
group:
  title: Components
  order: 4
---

# Img

图片组件

- 适配简写语法，快速定义图片宽高
- 限定宽度或者高度，支持等比例缩放
- 支持 contain 模式作为尺寸比例差异大的异常素材兜底展示方案

Demo:

```tsx
import React from 'react';
import { Img, Box } from 'snowbox';

export default () => (
  <Box col m={10} p={10} br={10} bg="B020">
    <Box f={20} cl="T010" DIN>
      图片
    </Box>
    <Box mt={10} style={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <Box col w={150}>
        <Box>期望宽度100，高度等比例适配</Box>
        <Box>
          <Img source={{ uri: 'https://xqimg.imedao.com/1811de0356b43273fe4a0066.png' }} w={100} />
        </Box>
      </Box>
      <Box col w={150}>
        <Box>期望高度100，宽度等比例适配</Box>
        <Box>
          <Img source={{ uri: 'https://xqimg.imedao.com/1811de0356b43273fe4a0066.png' }} h={100} />
        </Box>
      </Box>
    </Box>
    <Box mt={20} style={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <Box col w={150}>
        <Box>宽高设置1/2，尺寸差别大，调整为contain模式</Box>
        <Box>
          <Img
            source={{ uri: 'https://xqimg.imedao.com/1811de0356b43273fe4a0066.png' }}
            w={100}
            h={200}
            autoContainImage={true}
          />
        </Box>
      </Box>
      <Box col w={150}>
        <Box>宽高设置1/2，不配置默认cover</Box>
        <Box>
          <Img source={{ uri: 'https://xqimg.imedao.com/1811de0356b43273fe4a0066.png' }} h={200} w={100} />
        </Box>
      </Box>
    </Box>
  </Box>
);
```

## API

|       Name       |                       Description                        |      Type       |  Default   |
| :--------------: | :------------------------------------------------------: | :-------------: | :--------: |
|      source      |            图片源数据（仅支持远程 URL 地址）             | ImageURISource  | (required) |
|        h         |       预期图片展示高度（缺省则按照宽度等比例缩放）       |     number      |     --     |
|        w         |       预期图片展示宽度（缺省则按照高度等比例缩放）       |     number      |     --     |
| autoContainImage | 图片实际尺寸与展示尺寸相差过大，自动缩放图片（默认关闭） |     boolean     |   false    |
|    resizeMode    |    Image 原生属性，配置后则覆盖 autoContainImage 效果    | ImageResizeMode |     --     |
