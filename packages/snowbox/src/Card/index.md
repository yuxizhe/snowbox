---
nav:
  title: Components
  path: /components
# mobile: false
group:
  title: Components
  order: 2
---

# Card

## Card 容器组件

卡片组件

> 支持配置
>
> - 标题配置
> - 辅助弹窗
> - 右侧说明文字
> - 说明文字跳转链接
> - 下方辅助文字

### Demo

```tsx
import React from 'react';
import { Box, Card, Tag } from 'snowbox';

export default () => (
  <Box col m={10} py={10} br={10} bg="Blu014">
    <Box f={20} mx={10} cl="T010" DIN>
      Card
    </Box>
    <Box>
      <Card
        title="标题"
        assisText="辅助说明文字"
        jumpUrlText="详情"
        jumpUrl="/rn"
        actionsheetTitle="指标说明"
        actionsheetContent={
          <Box col flex={1}>
            <Box cl="T020" flex={1}>
              基金费率包括管理费，业绩报酬等，不同基金的费率收取规则不同，详细费用以合同为准
            </Box>
          </Box>
        }
      >
        <Box col>
          <Box>
            <Tag bg="B030" cl="T020">
              指数型
            </Tag>
          </Box>
          <Box style={{ justifyContent: 'space-between' }}>
            <Box col>
              <Box f={18} lh={25} cl="T010" fw="500" DIN>
                4,642.90
              </Box>
              <Box f={12} lh={17} fw="400" cl="T020">
                持有金额（元）
              </Box>
            </Box>
            <Box col>
              <Box f={18} lh={25} cl="Grn010" fw="500" DIN>
                -83.90
              </Box>
              <Box f={12} lh={17} fw="400" cl="T020">
                日收益（03-15）
              </Box>
            </Box>
            <Box col>
              <Box f={18} lh={25} cl="Red010" fw="500" DIN>
                +127.49
              </Box>
              <Box f={12} lh={17} fw="400" cl="T020">
                累计收益
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
    <Box mt={12}>
      <Card title="不带辅助说明" jumpUrlText="暂无更多">
        <Box col bg="B030" px={12} py={12}>
          <Box style={{ justifyContent: 'space-between' }}>
            <Box f={12} lh={17} fw="400" cl="T020">
              累计收益率
            </Box>
            <Box f={12} lh={17} fw="500" cl="Red010" DIN>
              +27.83%
            </Box>
            <Box f={12} lh={17} fw="400" cl="T020">
              持有份额
            </Box>
            <Box f={12} lh={17} fw="500" cl="T010" DIN>
              50,112.30
            </Box>
          </Box>
          <Box style={{ justifyContent: 'space-between' }} mt={8}>
            <Box f={12} lh={17} fw="400" cl="T020">
              持有收益
            </Box>
            <Box f={12} lh={17} fw="500" cl="Red010" DIN>
              +1888.90
            </Box>
            <Box f={12} lh={17} fw="400" cl="T020">
              持有收益率
            </Box>
            <Box f={12} lh={17} fw="500" cl="Red010" DIN>
              +22.90%
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
    <Box mt={12}>
      <Card title="仅标题无跳转无补充icon" pb={0} />
    </Box>
  </Box>
);
```

<API></API>
