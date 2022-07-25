import React from 'react';
import { Box, LottieAnimate } from '../index';

type Props = { h: number };

const LOADING_ANIMATION = {
  day: require('../../assets/json/loading_gray_day.json'),
  night: require('../../assets/json/loading_gray_night.json'),
};

export default function Loading({ ...props }: Props) {
  return (
    <Box flex={1}>
      <Box c flex={1} {...props}>
        <Box>
          <LottieAnimate w={20} h={20} dataSource={LOADING_ANIMATION} />
          <Box cl="T030" ml={8}>
            加载中...
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
