import React, { useState } from 'react';
import { Box, PButton, ActionSheet } from 'snowbox';

const ActionSheets = () => {
  const [visible, setVisible] = useState(false);
  const [showCloseIcon, setShowCloseIcon] = useState(true);
  const [showRightIcon, setShowRightIcon] = useState(true);

  return (
    <Box col m={10} p={10} br={10} bg="B020">
      <Box f={20} cl="T010" DIN>
        ActionSheets
      </Box>
      <Box>
        <PButton
          m={10}
          bg="Blu014"
          onPress={() => {
            setVisible(true);
            setShowCloseIcon(true);
            setShowRightIcon(true);
          }}
          DIN
        >
          open sheet with full header
        </PButton>
      </Box>

      <Box f={20} cl="T010">
        <PButton
          m={10}
          bg="Blu014"
          onPress={() => {
            setVisible(true);
            setShowCloseIcon(false);
          }}
          DIN
        >
          open sheet without close icon
        </PButton>
      </Box>

      <Box f={20} cl="T010">
        <PButton
          m={10}
          bg="Blu014"
          onPress={() => {
            setVisible(true);
            setShowCloseIcon(true);
            setShowRightIcon(false);
          }}
          DIN
        >
          open sheet without right PButton
        </PButton>
      </Box>

      <ActionSheet
        visible={visible}
        onRequestClose={() => setVisible(false)}
        headerTitle="指标说明"
        headerRightText={showRightIcon ? '新建' : ''}
        showHeaderCloseIcon={showCloseIcon}
        onCloseIconClick={() => setVisible(false)}
        onHeaderRightClick={() => setVisible(false)}
        footer="我知道了"
        onFooterClick={() => setVisible(false)}
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

export default ActionSheets;
