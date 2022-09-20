import React from 'react';
import { Box, Img, Badge } from 'snowbox';
import { ThemeColor } from 'snowbox';
import { boxTypes } from 'snowbox/src/Utils/props';
import { config } from './config';

interface BageProps {
  /**
   * background 背景颜色 默认为'Org010'
   * 填写雪球统一设计规范的颜色代码
   */
  bg?: keyof typeof ThemeColor | (string & {});
  /**
   * color 颜色 默认为'T060'
   * 填写雪球统一设计规范的颜色代码
   */
  cl?: keyof typeof ThemeColor | (string & {});
  /**
   * 展示封顶的数字值，默认为 99。
   */
  overflowCount?: number;
  /**
   * 当数值为 0 时，是否展示 Badge。
   */
  showZero?: boolean;
  /**
   * 偏移量
   * 徽标默认right为徽标-1/2宽度，top为-1/2高度(6px)。
   * 位置偏移格式为 [right, top]，表示状态点距默认位置往右(正值)、往上(正值)的偏移量。
   */
  offset?: [number | string, number | string];
  children?: React.ReactNode;
}

interface Contribute extends boxTypes {
  /**
   * config 配置中的名称
   */
  name: keyof typeof config;
  /**
   * 头像size,默认50
   */
  size?: number;
  /**
   * 角标配置
   */
  bageSet?: BageProps;
  /**
   *是否展示角标
   */
  showBadge?: boolean;
  /**
   * 头像图片style设置
   */
  imgStyle?: boxTypes;
}

export default ({
  name,
  bageSet = {},
  size = 50,
  style,
  showBadge = true,
  imgStyle = {},
  ...otherProps
}: Contribute) => (
  <>
    {name && config[name] ? (
      <Box {...otherProps}>
        {name && showBadge ? (
          <Badge count={config[name].name} {...bageSet}>
            <Img
              source={{ uri: config[name].uri }}
              style={[{ width: size, height: size, borderRadius: '50%', border: '1px solid #CCCCCC' }, imgStyle]}
            ></Img>
          </Badge>
        ) : (
          <Img
            source={{ uri: config[name].uri }}
            style={[{ width: size, height: size, borderRadius: '50%', border: '1px solid #CCCCCC' }, imgStyle]}
          ></Img>
        )}
      </Box>
    ) : null}
  </>
);
