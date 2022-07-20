import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { getSize, THEME, ThemeColor } from '../Utils';

interface XqText extends TextProps {
  size?: number;
  level?: 1 | 2 | 3;
  bold?: boolean;
}

const XqText: React.FC<XqText> = (props) => {
  const { size = 14, level = 2, children, bold, style, ...othersProps } = props;
  const autoSize = getSize(size);
  return (
    <Text
      {...othersProps}
      style={[
        styles.text,
        {
          // @ts-ignore
          color: ThemeColor[`T0${level}0`][THEME],
          fontSize: autoSize,
          lineHeight: 1.4 * autoSize,
          fontWeight: bold || level === 1 ? '500' : 'normal',
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default XqText;
