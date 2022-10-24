import React from 'react';
import { Box, StackedBar } from 'snowbox';

const StackedBarDemo = () => (
  // @ts-ignore
  <Box col m={10} p={10} br={10} bg="B020" flex={1} style={{ rowGap: 16 }}>
    <StackedBar
      data={[
        {
          color: 'Chart009',
          percent: 100,
        },
      ]}
    />
    <StackedBar
      data={[
        {
          color: 'Chart009',
          percent: 74.2,
        },
        {
          color: 'Chart001',
          percent: 21.48,
        },
        {
          color: 'Chart006',
          percent: 7.67,
        },
        {
          color: 'Chart008',
          percent: 0.4,
        },
      ]}
    />
    <StackedBar
      height={8}
      data={[
        {
          color: 'Chart009',
          percent: 58.53,
        },
        {
          color: 'Chart006',
          percent: 11.66,
        },
        {
          color: 'Chart008',
          percent: 32.29,
        },
      ]}
    />
  </Box>
);

export default StackedBarDemo;
