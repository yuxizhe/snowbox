import React from 'react';
import { Box, ContrastBar } from 'snowbox';

const SparkLine = () => (
  <Box col m={10} p={10} br={10} bg="B020" flex={1} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <ContrastBar
      width={70}
      fields={['this_product', 'benchmark_index']}
      data={[
        {
          this_product: '-0.0580',
          benchmark_index: '-0.0872',
        },
        {
          this_product: '-0.0146',
          benchmark_index: '-0.0245',
        },
        {
          this_product: '-0.0894',
          benchmark_index: '-0.0762',
        },
      ]}
    />
    <ContrastBar
      width={70}
      fields={['this_product', 'benchmark_index']}
      data={[
        {
          this_product: '0.0894',
          benchmark_index: '0.0762',
        },
        {
          this_product: '0.0580',
          benchmark_index: '0.0872',
        },
        {
          this_product: '0.0146',
          benchmark_index: '0.0245',
        },
      ]}
    />
    <ContrastBar
      width={70}
      fields={['this_product', 'benchmark_index']}
      data={[
        {
          this_product: '-0.0146',
          benchmark_index: '0.0245',
        },
        {
          this_product: '0.0580',
          benchmark_index: '-0.0872',
        },
        {
          this_product: '-0.0894',
          benchmark_index: '-0.0762',
        },
      ]}
    />
    <ContrastBar
      width={70}
      fields={['this_product', 'benchmark_index', 'third']}
      colors={[undefined, undefined, ['Blu010', 'Ylw010']]}
      data={[
        {
          this_product: '0.0580',
          benchmark_index: '-0.0872',
          third: '0.0238',
        },
        {
          this_product: '-0.0146',
          benchmark_index: '0.0245',
          third: '-0.0238',
        },
        {
          this_product: '-0.0894',
          benchmark_index: '-0.0762',
          third: '0.0338',
        },
      ]}
    />
  </Box>
);

export default SparkLine;
