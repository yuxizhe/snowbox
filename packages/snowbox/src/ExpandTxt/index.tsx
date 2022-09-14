import React, { useState } from 'react';
import { Utils, Box, Txt, Press, Icon } from 'snowbox';

import { StyleSheet, TextStyle } from 'react-native';

import { colorStrings } from '../Utils/props';
import icon from '../Icon/icon';

type IconType = keyof typeof icon;

/**
 * 展开折叠组件接口类型
 */
interface ExpandTxtInterfaceProps {
  /**
   * 内容
   */
  content: string;

  /**
   * 单行文本行高默认16对应字体12nomal
   */
  lineHeight?: number;

  /**
   * 默认5行之后换行少于5行能展示全 不显示展开收起
   */
  numberOfLines?: number;

  /**
   * 默认12
   */
  contentFontSize?: number;

  /**
   * 默认normal
   */
  contentFontWeight?: TextStyle['fontWeight'];

  /**
   * 默认T020
   */
  contentTxtColor?: colorStrings | (string & {});

  /**
   * 自定义底部展开状态下的组件   默认是收起状态
   */
  customExpandElement?: React.ReactElement;

  /**
   * 自定义底部折叠状态下的组件
   */
  customFoldElement?: React.ReactElement;

  /**
   * 展开收起默认12
   */
  expandFontSize?: number;

  /**
   * 展开收起默认normal
   */
  expandFontWeight?: TextStyle['fontWeight'];

  /**
   * 展开收起文案默认T030
   */
  expandTxtColor?: colorStrings | (string & {});

  /**
   * 展开
   */
  expandLabel?: string;

  /**
   * 收起
   */
  foldLabel?: string;

  /**
   * 展开箭头默认 icon_s_fold
   */
  expandIconType?: IconType;

  /**
   * 收起箭头默认 icon_s_unfold
   */
  foldIconType?: IconType;

  /**
   * 计算出文本高度减去行数乘以行高的偏差 默认3  例如iOS中英文混合等行高可能有一定的误差
   */
  foldLineOffset?: number;
}

interface FoldViewInterfaceProps {
  isShow: boolean;
  isExpand: boolean;
  onPress: () => void;
}

const ExpandTxt: React.FC<ExpandTxtInterfaceProps> = ({
  content,
  contentFontSize = 12,
  lineHeight = 16,
  numberOfLines = 5,
  contentFontWeight = 'normal',
  contentTxtColor = 'T020',
  expandTxtColor = 'T030',
  expandLabel = '展开',
  foldLabel = '收起',
  expandFontSize = 12,
  expandFontWeight = 'normal',
  expandIconType = 'icon_s_fold',
  foldIconType = 'icon_s_unfold',
  foldLineOffset = 3,
  customExpandElement,
  customFoldElement,
}) => {
  const [isExpand, setIsExpand] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const getRnSize = Utils.getRnSize;

  const clickExpand = () => {
    setIsExpand(!isExpand);
  };
  const ExpandHeight = getRnSize(lineHeight * numberOfLines);

  const DefaultExpandElement = () => {
    return (
      <>
        <Box f={expandFontSize} fw={expandFontWeight} cl={expandTxtColor} mr={2}>
          {foldLabel}
        </Box>
        <Icon type={expandIconType} />
      </>
    );
  };

  const DefaultFoldElement = () => {
    return (
      <>
        <Box f={expandFontSize} fw={expandFontWeight} cl={expandTxtColor} mr={2}>
          {expandLabel}
        </Box>
        <Icon type={foldIconType} />
      </>
    );
  };

  const FoldView: React.FC<FoldViewInterfaceProps> = ({ isShow, isExpand, onPress }) => {
    if (!isShow) {
      return null;
    }

    return (
      <Press onPress={onPress} c py={4}>
        {!isExpand ? customFoldElement || <DefaultFoldElement /> : customExpandElement || <DefaultExpandElement />}
      </Press>
    );
  };

  return (
    <Box style={{ display: content ? 'flex' : 'none' }} col>
      <Box
        ab
        t={0}
        l={0}
        r={0}
        lh={lineHeight}
        f={contentFontSize}
        fw={contentFontWeight}
        style={styles.calcLabel}
        numberOfLines={0}
        onLayout={(e) => {
          setIsShow(e.nativeEvent.layout.height - foldLineOffset > ExpandHeight);
        }}
      >
        {content}
      </Box>
      <Txt
        cl={contentTxtColor}
        fw={contentFontWeight}
        lh={lineHeight}
        f={contentFontSize}
        numberOfLines={isExpand ? 0 : numberOfLines}
      >
        {content}
      </Txt>
      <FoldView isShow={isShow} isExpand={isExpand} onPress={clickExpand} />
    </Box>
  );
};

const styles = StyleSheet.create({
  // 只参与计算不显示
  calcLabel: {
    zIndex: -100,
    color: 'transparent',
  },
});

export default ExpandTxt;
