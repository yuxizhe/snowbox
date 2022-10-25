import React, { ReactNode } from 'react';
import { TextStyle, ViewStyle, TextProps } from 'react-native';
import colors from '../theme/color.json';

export interface ReactPropsTypes {
  style?: ViewStyle | TextStyle;
  children?: ReactNode;
}

export interface PositionTypes {
  /**
   * absolute绝对定位 输入ab即可
   */
  ab?: boolean | string;
  /**
   * left
   */
  l?: number | string;
  /**
   * right
   */
  r?: number | string;
  /**
   * top
   */
  t?: number | string;
  /**
   * bottom
   */
  b?: number | string;
  /**
   * style 居中
   *
   * 居中 写c即可
   */
  c?: boolean;
  /**
   * style 纵向排列 写col即可
   * @type {boolean} flex-direction: column;
   */
  col?: boolean;
  /**
   * flex 值
   */
  flex?: number;
}

export const PositionProps = {
  ab: {
    value: {
      position: 'absolute',
    },
  },
  l: { property: 'left' },
  r: { property: 'right' },
  t: { property: 'top' },
  b: { property: 'bottom' },
  c: {
    value: {
      justifyContent: 'center',
    },
  },
  col: {
    value: {
      alignItems: 'stretch',
      flexDirection: 'column',
    },
  },
  flex: {
    property: 'flex',
  },
};

export type colorStrings = keyof typeof colors;

export const colorJson = colors;

export interface fontTypes extends TextProps {
  /**
   * fontsize
   */
  f?: number;
  /**
   * font weight
   */
  fw?: TextStyle['fontWeight'];
  /**
   * color 颜色
   * 填写雪球统一设计规范的颜色代码
   */
  cl?: colorStrings | (string & {});
  /**
   * lineHeight
   */
  lh?: number;
  /**
   * 是否使用 DIN 字体
   */
  DIN?: boolean;
  /**
   * 是否禁用 自动设置大小
   *
   * 默认所有的大小 会根据375进行换算
   */
  noAuto?: boolean;
  /**
   * letterSpacing
   *
   * 可实现行内元素占位 伪空格文字, 真实的行内元素绝对定位
   *
   * 使用方法：
   *
   * `<Txt ls={70}> </Txt>`  中间记得加空格
   */
  ls?: number;

  style?: ViewStyle | TextStyle;
}

export const fontProps = {
  f: { property: 'fontSize' },
  fw: { property: 'fontWeight' },
  cl: { property: 'color' },
  lh: { property: 'lineHeight' },
  DIN: {
    value: {
      fontFamily: 'DIN-Medium',
    },
  },
  ls: {
    property: 'letterSpacing',
  },
};

export const sizeProps = [
  'l',
  'r',
  't',
  'b',
  'w',
  'h',
  'p',
  'px',
  'py',
  'f',
  'pl',
  'pr',
  'pt',
  'pb',
  'm',
  'mx',
  'my',
  'mt',
  'ml',
  'mr',
  'mb',
  'br',
  'bw',
  'lh',
  'ls',
];

export interface boxTypes extends PositionTypes, fontTypes {
  /**
   * style width
   * 填 数字 或者 100% 等
   */
  w?: number | string;
  /**
   * style height
   * 填 数字 或者 100% 等
   */
  h?: number | string;
  /**
   * padding
   */
  p?: number | string;
  /**
   * padding X轴 paddingLeft & paddingRight
   */
  px?: number | string;
  /**
   * padding Y轴 paddingTop & paddingBottom
   */
  py?: number | string;
  /**
   * paddingLeft
   */
  pl?: number | string;
  /**
   * paddingRight
   */
  pr?: number | string;
  /**
   * paddingTop
   */
  pt?: number | string;
  /**
   * paddingBottom
   */
  pb?: number | string;
  /**
   * margin
   */
  m?: number | string;
  /**
   * margin x轴  marginLeft & marginRight
   */
  mx?: number | string;
  /**
   * margin y轴  marginTop & marginButton
   */
  my?: number | string;
  /**
   * marginLeft
   */
  ml?: number | string;
  /**
   * marginRight
   */
  mr?: number | string;
  /**
   * marginTop
   */
  mt?: number | string;
  /**
   * marginBottom
   */
  mb?: number | string;
  /**
   * background 背景颜色
   *
   * 填写雪球统一设计规范的颜色代码
   */
  bg?: colorStrings | (string & {});
  /**
   * borderRadius
   */
  br?: number | string;
  /**
   * borderWidth
   */
  bw?: number;
  /**
   * borderColor
   */
  bc?: colorStrings | (string & {});

  children?: any;
}

export const boxProps = {
  ...PositionProps,
  w: { property: 'width' },
  h: { property: 'height' },
  // style padding
  p: { property: 'padding' },
  px: { property: 'paddingHorizontal' },
  py: { property: 'paddingVertical' },
  pl: { property: 'paddingLeft' },
  pr: { property: 'paddingRight' },
  pt: { property: 'paddingTop' },
  pb: { property: 'paddingBottom' },
  // style margin
  m: { property: 'margin' },
  mx: { property: 'marginHorizontal' },
  my: { property: 'marginVertical' },
  ml: { property: 'marginLeft' },
  mr: { property: 'marginRight' },
  mt: { property: 'marginTop' },
  mb: { property: 'marginBottom' },
  // style backgroundColor
  bg: { property: 'backgroundColor' },
  // style border
  br: { property: 'borderRadius' },
  bw: { property: 'borderWidth' },
  bc: { property: 'borderColor' },
};

export type buttonTypes = boxTypes & {
  /**
   * 点击事件
   */
  onPress: (e: any) => any;
};
