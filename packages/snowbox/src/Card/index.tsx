import React, { ReactNode, useState } from 'react';
import { boxTypes } from '../Utils/props';
import { Box, Press, Icon, ActionSheet } from '../index';
import { onPressGoToUrl } from '../Utils';

interface CardPropsType extends boxTypes {
  children?: ReactNode;
  /**
   * 弹窗标题
   */
  actionsheetTitle?: string;
  /**
   * 弹窗文案: 只有标题无内容不展示弹窗
   */
  actionsheetContent?: React.ReactElement;
  /**
   * 模块标题
   */
  title: string | React.ReactElement;
  /**
   * 辅助说明文字
   */
  assisText?: string;
  /**
   * 链接文案， 为空时不展示
   */
  jumpUrlText?: string;
  /**
   * 跳转链接: 未配置时点击不跳转
   */
  jumpUrl?: string;
  /**
   * 可配置其他box属性，default：px12；pt12；mt8；mx12
   */
}

function Card({
  children,
  title = '',
  assisText = '',
  actionsheetTitle = '',
  actionsheetContent,
  jumpUrl,
  jumpUrlText = '',
  ...boxProps
}: CardPropsType) {
  const [visible, setVisible] = useState(false);
  return (
    <Box w="100%" bg="B020" px={12} pt={12} pb={12} mt={8} mx={12} br={8} {...boxProps} col flex={1}>
      <Box col pb={assisText ? 4 : 12}>
        <Box style={{ justifyContent: 'space-between' }}>
          <Box>
            <Box cl="T010" fw="500" f={16} lh={22}>
              {title}
            </Box>
            {actionsheetContent && (
              <Press
                ml={3}
                onPress={() => {
                  setVisible(true);
                }}
              >
                <Icon type="icon_s_explain_linear" />
              </Press>
            )}
          </Box>
          {jumpUrlText ? (
            <Press
              onPress={() => {
                jumpUrl && onPressGoToUrl(jumpUrl);
              }}
            >
              <Box f={12} lh={16} cl="T020">
                {jumpUrlText}
              </Box>
              {jumpUrl ? <Icon type="icon_s_more" /> : null}
            </Press>
          ) : null}
        </Box>
        {assisText ? (
          <Box mt={2} f={12} cl="T030">
            {assisText}
          </Box>
        ) : null}
      </Box>
      {children}
      {actionsheetContent ? (
        <ActionSheet
          showHeaderCloseIcon
          footer="我知道了"
          visible={visible}
          onRequestClose={() => {
            setVisible(false);
          }}
          onCloseIconClick={() => {
            setVisible(false);
          }}
          onFooterClick={() => {
            setVisible(false);
          }}
          content={actionsheetContent}
          headerTitle={actionsheetTitle}
        />
      ) : null}
    </Box>
  );
}
export default Card;
