import React, { useState, useEffect } from 'react';
import { Box, Press, Icon } from '..';
import styles from './styles';

import { boxTypes } from '../Utils/props';

type Props = {
  children?: any;
  /**
   * 尺寸 m: 大号 s: 小号(默认)
   */
  size?: 'm' | 's' | undefined;
  /**
   * 直径: 配置时忽略size
   */
  width?: number;
  /**
   * 点击回调，返回选中状态
   */
  onChange?: (checked?: boolean) => void;
  /**
   * 禁用
   */
  disabled?: boolean;
  /**
   * 选中态
   */
  checked?: boolean;

  /**
   * 是否展示勾选提示
   */
  showTip?: boolean;

  /**
   * 勾选提示距左侧距离
   */
  left?: number;

  /**
   * 勾选提示距左侧距离
   */
  top?: number;
} & boxTypes;

/**
 * Radio组件
 */
function Radio({ children, size, width, onChange, disabled, checked, showTip, left, top = -50, ...otherProps }: Props) {
  const style = styles();
  const [active, setActive] = useState(checked || false);

  const change = () => {
    setActive(!active);
    onChange && onChange(!active);
  };

  useEffect(() => {
    const value = checked || false;
    setActive(value);
  }, [checked]);

  const radioWidth = width || (size === 'm' ? 18 : 12);
  const iconWidth = width ? (width * 5) / 9 : size === 'm' ? 10 : 6.3;
  const iconHeight = width ? (width * 7) / 18 : size === 'm' ? 7 : 4.5;
  const tipLeft = left || -(14.5 - radioWidth / 2);

  const radio = (
    <Box w={radioWidth} h={radioWidth} {...otherProps}>
      {showTip ? (
        <Box p={8} w={68} bg="Blu010" br={4} ab t={top} l={tipLeft} col style={style.shadow}>
          <Box cl="T060" f={12} c>
            请勾选
          </Box>
          <Box w={10} h={10} bg="Blu010" ab b={-4} l={10} br={2} style={style.rotate} />
        </Box>
      ) : null}

      <Press
        onPress={() => {
          !disabled && change();
        }}
      >
        <Box
          style={active ? style.center : disabled ? style.disabled : style.border}
          w={radioWidth}
          h={radioWidth}
          bg={active ? 'Blu010' : undefined}
          br={50}
        >
          {active ? <Icon w={iconWidth} h={iconHeight} type="icon_s_whiteHook" /> : null}
        </Box>
      </Press>
    </Box>
  );
  return radio;
}

export default Radio;
