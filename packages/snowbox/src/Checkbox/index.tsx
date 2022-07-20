import React, { useState } from 'react';
import { Box, Press, Icon, THEME } from '..';
import styles from './styles';

import { boxTypes } from '../Utils/props';

type Props = boxTypes & {
  children?: any;
  /**
   * 点击 回调，返回当前选中的value数组, checked: 本次操作为勾选or取消
   */
  onChange?: (checked?: boolean) => void;
  /**
   * 默认选
   */
  checked?: boolean;
  /**
   * 禁用
   */
  disabled?: boolean;
};

/**
 * Checkbox组件
 */
function Checkbox({ children, onChange, checked, disabled, ...otherProps }: Props) {
  const style = styles(THEME);
  const [active, setActive] = useState(checked || false);

  const change = () => {
    setActive(!active);
    onChange && onChange(!active);
  };

  const checkbox = (
    <Press
      onPress={() => {
        !disabled && change();
      }}
      {...otherProps}
    >
      <Box
        style={active ? style.center : disabled ? style.disabled : style.border}
        w={16}
        h={16}
        bg={active ? 'Blu010' : undefined}
        br={2}
      >
        {active ? <Icon w={9.45} h={6.75} type="icon_s_whiteHook" /> : null}
      </Box>
    </Press>
  );

  return checkbox;
}

export default Checkbox;
