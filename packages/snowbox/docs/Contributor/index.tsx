import React from 'react';
import { Box, Img, Badge } from 'snowbox';
import { ThemeColor } from 'snowbox';
import { boxTypes } from 'snowbox/src/Utils/props';

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
   * 必填 贡献者配置
   * uri: 图片路径
   * name: 角标内容（不填写不显示）
   */
  imageAddress: {
    uri: string;
    name?: string | number;
  }[];
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
   * 容器内item布局, 不设置默认右边距20，上边距15
   */
  ItemStyle?: boxTypes;
  /**
   * 头像style设置
   */
  imgStyle?: boxTypes;
}

export default ({
  imageAddress,
  bageSet = {},
  size = 50,
  style,
  showBadge = true,
  ItemStyle = {},
  imgStyle = {},
  ...otherProps
}: Contribute) => (
  <Box flex={1} {...otherProps} style={[{ flexWrap: 'wrap' }, style]}>
    {imageAddress.map((item) => (
      <Box col c mr={20} mt={15} {...ItemStyle}>
        {item.name && showBadge ? (
          <Badge count={item.name} {...bageSet}>
            <Img
              source={{ uri: item.uri }}
              style={[{ width: size, height: size, borderRadius: '50%', border: '1px solid #CCCCCC' }, imgStyle]}
            ></Img>
          </Badge>
        ) : (
          <Img
            source={{ uri: item.uri }}
            style={[{ width: size, height: size, borderRadius: '50%', border: '1px solid #CCCCCC' }, imgStyle]}
          ></Img>
        )}
      </Box>
    ))}
  </Box>
);
