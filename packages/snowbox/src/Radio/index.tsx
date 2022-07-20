import React, { useState, useEffect } from 'react';
import { Box, Press, Icon } from '..';
import styles from './styles';

import { boxTypes } from '../Utils/props';

type Props = boxTypes & {
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
};

/**
 * Radio组件
 */
function Radio({ children, size, width, onChange, disabled, checked, ...otherProps }: Props) {
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

  const radio = (
    <Press
      onPress={() => {
        !disabled && change();
      }}
      {...otherProps}
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
  );
  return radio;
}

export default Radio;
