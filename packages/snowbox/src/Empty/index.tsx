import React, { FC } from 'react';
import { Image } from 'react-native';
import { getSize, Box, THEME } from '../';

const uri = {
  day: 'https://xqimg.imedao.com/18002ad5ed0183f3feda79c2.png',
  night: 'https://xqimg.imedao.com/18002ada074189f3fe9494a5.png',
};

type Props = {
  /**
   * 文案
   */
  text?: string;
  /**
   * 高度
   */
  height?: number;
  /**
   * 宽度
   */
  width?: number;
  /**
   * 图片 margin-top
   */
  mt?: number;
};

/**
 * Empty组件
 */
const Empty: FC<Props> = (props): any => {
  const { text = '暂无数据', width = 186, height = 72, mt = 100 } = props;
  return (
    <Box col c mt={mt} w="100%">
      <Box c>
        <Image
          style={{
            width: getSize(width),
            height: getSize(height),
          }}
          source={{
            uri: uri[THEME],
          }}
          resizeMode="stretch"
        />
      </Box>
      <Box f={14} cl="T030" c mt={40}>
        {text}
      </Box>
    </Box>
  );
};

export default Empty;
