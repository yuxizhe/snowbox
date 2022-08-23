import React from 'react';
import { TouchableOpacity } from 'react-native';

import Box from '../Box';
import { buttonTypes } from '../Utils/props';

const Press = ({ children, onPress, w, ...props }: buttonTypes) => (
  <Box {...props}>
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} hitSlop={{ left: 8, right: 8, top: 8, bottom: 8 }}>
      <Box w={w} c>
        {children}
      </Box>
    </TouchableOpacity>
  </Box>
);

export default Press;
