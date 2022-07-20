import React from 'react';
import LottieView from 'lottie-react-native';
import { Box, THEME } from '../index';

/**
 * daySource: { day: require(), night: require()}
 */
type Props = {
  w: number;
  h: number;
  dataSource: any;
};

export default function Loading({ w, h, dataSource }: Props) {
  return (
    <Box w={w} h={h}>
      <LottieView source={dataSource[THEME]} autoPlay loop />
    </Box>
  );
}
