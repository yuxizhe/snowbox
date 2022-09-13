---
nav:
  title: Components
  path: /components
group:
  title: Components
  order: 2
---

# ActionSheet 弹窗

ActionSheet 弹窗组件，支持横屏模式，有多重灵活配置功能。

支持配置

- 弹窗标题
- 标题左侧按钮
- 标题右侧文字
- 弹窗内 padding，高度
- 弹窗动画
- 软键盘配置
- footer 配置
- 多种交互（详见 API）

Demo

```tsx
import React, { useState } from 'react';
import { Box, ActionSheet, Button } from 'snowbox';
export default () => {
  const [visible, setVisible] = useState(false);
  const [showCloseIcon, setShowCloseIcon] = useState(true);
  const [showRightIcon, setShowRightIcon] = useState(true);

  const [isLandscape, setIsLandscape] = useState(false);

  return (
    <Box col m={10} p={10} br={10} bg="B020">
      <Box f={20} cl="T010" DIN>
        ActionSheets
      </Box>
      <Box>
        <Button
          m={10}
          // bg="Blu014"
          onPress={() => {
            setVisible(true);
            setShowCloseIcon(true);
            setShowRightIcon(true);
          }}
          DIN
        >
          open sheet with full header
        </Button>
      </Box>

      <Box f={20} cl="T010">
        <Button
          m={10}
          // bg="Blu014"
          onPress={() => {
            setVisible(true);
            setShowCloseIcon(false);
          }}
          DIN
        >
          open sheet without close icon
        </Button>
      </Box>

      <Box f={20} cl="T010">
        <Button
          m={10}
          // bg="Blu014"
          onPress={() => {
            setVisible(true);
            setShowCloseIcon(true);
            setShowRightIcon(false);
          }}
          DIN
        >
          open sheet without right PButton
        </Button>
      </Box>

      <Box>
        <Button
          m={10}
          // bg="Blu014"
          onPress={() => {
            setVisible(true);
            setIsLandscape(true);
            setShowCloseIcon(true);
            setShowRightIcon(true);
          }}
          DIN
        >
          横屏模式
        </Button>
      </Box>

      <ActionSheet
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
          setIsLandscape(false);
        }}
        headerTitle="指标说明"
        headerRightText={showRightIcon ? '新建' : ''}
        showHeaderCloseIcon={showCloseIcon}
        onCloseIconClick={() => {
          setVisible(false);
          setIsLandscape(false);
        }}
        onHeaderRightClick={() => {
          setVisible(false);
          setIsLandscape(false);
        }}
        footer="我知道了"
        isLandscape={isLandscape}
        onFooterClick={() => {
          setVisible(false);
          setIsLandscape(false);
        }}
        content={
          <Box col flex={1}>
            <Box f={16} cl="T010" fw="500">
              成立以来年化
            </Box>
            <Box f={14} cl="T020">
              即成立以来年化收益率（按年复利），是基金成立以来的累计收益率逐年复利计算的结果。若基金成立时间不足半年，不具备参考价值，不展示该数据。
            </Box>
          </Box>
        }
      />
    </Box>
  );
};
```

<API></API>
