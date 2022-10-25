import React from 'react';
import { Image } from 'react-native';
import icon from './icon';
import { getSize, THEME } from '../Utils';

type Props = {
  /**
   * 类型
   */
  type: keyof typeof icon;
  /**
   * 宽度
   */
  w?: number;
  /**
   * 高度
   */
  h?: number;
};

/**
 * Icon
 *
 * 目前客户端不支持SVG 先用图片
 *
 * 默认宽高 12
 */
export default function Icon({ type, w, h }: Props) {
  return <Image source={icon[type][THEME]} style={{ width: getSize(w || 12), height: getSize(h || 12) }} />;
}
