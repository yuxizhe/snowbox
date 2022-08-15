import React from 'react';
import { Box, Wrapper, Window, THEME } from 'snowbox';

const pages = [
  {
    url: '/snowbox',
    text: 'SnowBox 组件库',
  },
];

const IndexPage = () => {
  function jumpUrl(url) {
    Window.location.href = `${url}?theme=${THEME}`;
  }

  function changeTheme() {
    const theme = THEME === 'night' ? 'day' : 'night';
    Window.location.href = `/rn?theme=${theme}`;
  }

  return (
    <Box col bg="B020" flex={1}>
      <Box c DIN f={20} m={20}>
        雪球RN web
      </Box>
      <Box c cl="T020" f={10} onPress={changeTheme} mb={10}>
        切换日夜间模式
      </Box>
      <Box col>
        {Object.keys(pages).map((index) => (
          <Box c cl="Blu010" onPress={() => jumpUrl(pages[index].url)} DIN m={5}>
            {pages[index].text}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Wrapper(IndexPage);
