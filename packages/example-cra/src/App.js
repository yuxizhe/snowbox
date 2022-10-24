import React from 'react';
import { Box } from 'snowbox-ui';

export default function Demo() {
  return (
    <>
      <Box cl="Blu010">snowbox-ui</Box>
      <Box>
        <Box m={20} p={20} flex={1} bg="Blu014" bw={1} bc="Blu010">
          <Box c h={50} bg="Blu010" w="100%" DIN>
            Hello snowbox-ui
          </Box>
        </Box>
      </Box>
    </>
  );
}
