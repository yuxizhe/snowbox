import React, { ReactNode, useEffect, useState } from 'react';
import { Box, LayoutView } from '..';

interface GuideProps {
  /**
   * 是否展示提示
   */
  visible: boolean;
  /**
   * 提示信息展示位置
   */
  position?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
  /**
   * 展示箭头
   */
  showArrow?: boolean;
  /**
   * 提示信息内容，支持文字或者代码段
   */
  popContent: any;
  /**
   * 提示信息容器宽度，必传
   */
  popWidth: number;
  /**
   * 提示信息垂直方向间距
   */
  popOffsetY?: number;
  /**
   * 提示信息背景颜色
   */
  popBg?: string;
  /**
   * 提示信息容器宽度props，同Box组件的props
   */
  popProps?: any;

  children?: ReactNode;
}

interface positionProp {
  l?: string | number;
  r?: string | number;
  t?: string | number;
  b?: string | number;
}

const Guide: React.FC<GuideProps> = ({
  children,
  visible,
  position = 'bottomLeft',
  showArrow = true,
  popProps = {},
  popContent = '',
  popOffsetY = 0,
  popBg = 'Blu010',
  popWidth = 100,
}) => {
  const arrowSize = { w: 14, h: 7 };
  const [_visible, _setVisible] = useState(visible);
  const [positionProps, setPositionProps] = useState<positionProp>({});
  const [arrowProps, setArrowProps] = useState({});

  useEffect(() => {
    _setVisible(visible);
  }, [visible]);

  const onChildrenLayout = ({ nativeEvent }) => {
    const {
      layout: { width = 0, height = 0 },
    } = nativeEvent;
    const childSize = {
      w: width,
      h: height,
    };
    setPosition(childSize);
  };

  const setPosition = (Size) => {
    const { w, h } = Size;
    const arrowH = showArrow ? arrowSize.h : 0;
    const arrowW = showArrow ? arrowSize.w : 0;
    const arrLeft = (Math.min(popWidth, w) - arrowW) / 2;
    const posiProps: positionProp = {};
    const arrProps: positionProp = {};
    switch (position) {
      case 'topLeft':
        posiProps.l = 0;
        posiProps.t = -(h + arrowH + popOffsetY);
        arrProps.l = arrLeft;
        arrProps.b = -(10 - arrowH);
        break;
      case 'topCenter':
        posiProps.l = -((popWidth - w) / 2);
        posiProps.t = -(h + arrowH + popOffsetY);
        arrProps.l = '50%';
        arrProps.b = -(10 - arrowH);
        break;
      case 'topRight':
        posiProps.r = 0;
        posiProps.t = -(h + arrowH + popOffsetY);
        arrProps.r = arrLeft;
        arrProps.b = -(10 - arrowH);
        break;
      default:
      case 'bottomLeft':
        posiProps.l = 0;
        posiProps.t = h + arrowH + popOffsetY;
        arrProps.l = arrLeft;
        arrProps.t = -(10 - arrowH);
        break;
      case 'bottomCenter':
        posiProps.l = -((popWidth - w) / 2);
        posiProps.t = h + arrowH + popOffsetY;
        arrProps.l = '50%';
        arrProps.t = -(10 - arrowH);
        break;
      case 'bottomRight':
        posiProps.r = 0;
        posiProps.t = h + arrowH + popOffsetY;
        arrProps.r = arrLeft;
        arrProps.t = -(10 - arrowH);
        break;
    }
    setPositionProps(posiProps);
    setArrowProps(arrProps);
  };

  return (
    <Box style={{ position: 'relative' }}>
      <LayoutView onLayout={onChildrenLayout}>{children}</LayoutView>
      {_visible ? (
        <Box col px={8} w={popWidth} bg={popBg} py={2} br={4} ab {...popProps} {...positionProps}>
          {showArrow && (
            <Box w={10} h={10} bg={popBg} ab {...arrowProps} br={2} style={{ transform: [{ rotate: '45deg' }] }} />
          )}
          <Box c>{popContent}</Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default Guide;
