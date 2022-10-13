import React from 'react';
import { StyleSheet } from 'react-native';
import { getSize } from 'snowbox';
import { colorStrings } from 'src/Utils/props';
import Box from '../Box';

type ItemProps = {
  color: colorStrings;
  percent: number;
};

type Props = {
  /**
   * 元数据 { color: string; percent: number; }[]
   */
  data: ItemProps[];
  /**
   * 高度 默认4
   */
  height?: number;
};

/**
 * 堆叠柱状条组件
 */
const StackedBar = ({ data, height = 4 }: Props) => {
  const styles = createStyles(height);
  return (
    <Box>
      {(data || []).map(({ color, percent }, index) => (
        <Box
          key={index}
          h={height}
          bg={color}
          flex={Math.max(percent, 1)}
          style={{ ...(index === 0 && styles.left), ...(index === data.length - 1 && styles.right) }}
        />
      ))}
    </Box>
  );
};

export default StackedBar;

const createStyles = (height: number) => {
  const radius = getSize(height) as number;

  return StyleSheet.create({
    left: {
      borderTopLeftRadius: radius,
      borderBottomLeftRadius: radius,
    },
    right: {
      borderTopRightRadius: radius,
      borderBottomRightRadius: radius,
    },
  });
};
