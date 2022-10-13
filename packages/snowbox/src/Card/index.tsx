import React, { ReactNode, useState } from 'react';
import { onPressGoToUrl } from '../Utils';
import { boxTypes } from '../Utils/props';
import { Box, Press, Icon, ActionSheet, Txt } from '../index';
import { ActionSheetProps } from '../ActionSheet';

type ActionSheetProp = Omit<
  ActionSheetProps,
  'headerTitle' | 'content' | 'visible' | 'onCloseIconClick' | 'onRequestClose' | 'onFooterClick'
>;
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
  title?: string | React.ReactElement;
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
   * card jumpUrlText点击回调
   */
  jumpUrlTextClick?: () => void;
  /**
   * Actionsheet 除'headerTitle' | 'content' | 'visible' | 'onCloseIconClick' | 'onRequestClose' | 'onFooterClick' 外的其余属性
   */
  actionsheetProp?: ActionSheetProp;
}

function Card({
  children,
  title,
  assisText = '',
  actionsheetTitle = '',
  actionsheetContent,
  jumpUrl,
  jumpUrlText = '',
  jumpUrlTextClick,
  style,
  actionsheetProp = {},
  ...boxProps
}: CardPropsType) {
  const isString = ['string', 'number', 'boolean'].includes(typeof title);
  const [visible, setVisible] = useState(false);
  return (
    <Box
      bg="B020"
      px={12}
      pt={12}
      pb={12}
      mt={8}
      mx={12}
      br={8}
      col
      style={{ ...{ flexGrow: 1, flexShrink: 0 }, ...style }}
      {...boxProps}
    >
      {title ? (
        <Box col pb={assisText ? 4 : 12}>
          <Box style={{ justifyContent: 'space-between' }}>
            <Box flex={1}>
              {isString ? (
                <Txt cl="T010" fw="500" f={16} lh={22}>
                  {title}
                </Txt>
              ) : (
                <>{title}</>
              )}
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
                  jumpUrlTextClick && jumpUrlTextClick();
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
      ) : null}
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
          {...actionsheetProp}
        />
      ) : null}
    </Box>
  );
}
export default Card;

export const ActionSheetProp = (props: ActionSheetProp) => <></>;
