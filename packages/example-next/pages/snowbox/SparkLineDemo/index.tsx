import React, { FC, useEffect, useState } from 'react';
import { Box, SparkLines } from 'snowbox-ui';
import { demo_line1, demo_line2 } from './data';

const SparkLine = () => {
  const [config, setconfig] = useState<any>([]);

  useEffect(() => {
    const temp_a = [
      {
        type: 'polyline',
        sourcedata: demo_line1,
        props: {
          stroke: 'green',
          strokeWidth: 1.5,
          strokeLinejoin: 'round',
        },
      },
      {
        type: 'polyline',
        sourcedata: demo_line2,
        props: {
          stroke: '#AAAAAA',
          strokeWidth: 1,
          strokeLinejoin: 'round',
        },
      },
      {
        type: 'baseline',
        benchmarkpoint: '-0.204',
        props: {
          strokeDasharray: [2, 2],
        },
      },
    ];
    setconfig(temp_a);
  }, []);

  return (
    <Box col m={10} p={10} br={10} bg="B020" flex={1} style={{ flexDirection: 'row' }}>
      <Box>
        <SparkLines data={[demo_line1]} />
      </Box>
      <Box ml={12}>
        <SparkLines data={[demo_line1, demo_line2]} />
      </Box>
      <Box ml={12}>
        <SparkLines config={config} />
      </Box>
    </Box>
  );
};

export default SparkLine;
