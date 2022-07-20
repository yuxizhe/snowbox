import React from 'react';
import { Box, Icon } from '..';

type Props = {
  showArraw?: boolean;
  /**
   * 百分比
   */
  percent: number;
  steps: number;
  itemStyle?: any;
  arraw?: HTMLElement;
};

/**
 * Tabs组件
 */
export default function Progress({
  showArraw = true,
  percent,
  steps = 3,
  itemStyle: { width = 35, height = 4, gutter = 4, background = 'Blu011', color = 'Blu010' },
  arraw,
}: Props) {
  const checkMargin = (data) => {
    let margin = 0;
    const list = Array.from({ length: steps }, (item, index) => Number((index / steps).toFixed(2)));
    list.push(1);
    if (data === 0) {
      return margin;
    }
    for (let i = 0; i < steps; i += 1) {
      if (data > list[i] && data <= list[i + 1]) {
        margin = i * (width + gutter) + ((data - list[i]) / (list[i + 1] - list[i])) * width - 3;
        break;
      }
    }
    return margin;
  };

  const checkLength = (data, left, right) => {
    if (data > right) {
      return 1;
    }
    if (data > left && data <= right) {
      return (data - left) / (right - left);
    }
    return 0;
  };

  return (
    <Box col c>
      {showArraw ? (
        <Box mb={3} ml={checkMargin(percent)}>
          {percent ? arraw || <Icon type="icon_s_pin" w={6} h={5} /> : null}
        </Box>
      ) : null}
      <Box h={height} mr={5}>
        {Array.from({ length: steps }, (item, index) => index).map((item, index) => (
          <Box bg={background} w={width} mr={item === steps - 1 ? 0 : gutter} h={height} br={8} key={index}>
            <Box
              bg={color}
              h={4}
              w={checkLength(percent, ((1 / steps) * item).toFixed(2), ((1 / steps) * (item + 1)).toFixed(2)) * width}
              br={8}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
