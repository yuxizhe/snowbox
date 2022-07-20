import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';

import Box from '../Box';
import { buttonTypes } from '../Utils/props';

const PButton = (props: buttonTypes) => {
  const { children, onPress, px, py, br, p, ab, l, r, t, b, ...otherProps } = props;
  let paddingX = px === undefined ? 12 : px;
  let paddingY = py === undefined ? 4 : py;
  if (p !== undefined) {
    paddingX = p;
    paddingY = p;
  }
  return ab ? (
    // 直接用 ab = {ab} 会报错
    <Box ab l={l} r={r} t={t} b={b}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} hitSlop={{ left: 8, right: 8, top: 8, bottom: 8 }}>
        <Box px={paddingX} py={paddingY} br={br || 100} {...otherProps}>
          {children}
        </Box>
      </TouchableOpacity>
    </Box>
  ) : (
    <Box l={l} r={r} t={t} b={b}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} hitSlop={{ left: 8, right: 8, top: 8, bottom: 8 }}>
        <Box px={paddingX} py={paddingY} br={br || 100} {...otherProps}>
          {children}
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default PButton;
