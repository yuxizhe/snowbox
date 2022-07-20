import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { fontProps, fontTypes, sizeProps } from '../Utils/props';
import { getSize, OS, ThemeColor, THEME } from '../Utils';

const Txt = ({ style, children, noAuto = false, ...props }: fontTypes) => {
  const newProps = { f: 14, ...props };

  let fontStylesObj: TextStyle = {
    // 默认字体颜色 & PingFang 字体
    color: ThemeColor.T010[THEME],
    // fontFamily: 'PingFang SC',
  };

  // 安卓不支持500加粗 特殊处理
  if (OS === 'android' && newProps.fw && Number(newProps.fw) >= 500) {
    if (newProps.DIN) {
      fontStylesObj.fontFamily = newProps.fw === '500' ? 'DIN-Medium' : 'DIN-Bold';
      delete newProps.DIN;
    } else {
      fontStylesObj.fontWeight = 'bold';
    }
    delete newProps.fw;
  }

  const OtherProps = {};

  // 通用样式赋值
  Object.keys(newProps).map((item) => {
    // 尺寸类 屏幕适配
    if (!noAuto && sizeProps.indexOf(item) > -1 && typeof newProps[item] === 'number') {
      newProps[item] = getSize(newProps[item]);
    }

    // 文字类处理
    if (item in fontProps) {
      // 文字颜色处理
      if (item === 'cl' && props.cl && props.cl.indexOf('#') === -1) {
        fontStylesObj.color = ThemeColor[props.cl][THEME] || 'white';
        return '';
      }
      // 统一1.4倍行高
      if (item === 'f' && newProps.f) {
        fontStylesObj.lineHeight = newProps.f * 1.4;
      }
      // value等值的处理
      if (fontProps[item].value && newProps[item]) {
        fontStylesObj = Object.assign(fontStylesObj, fontProps[item].value);
        return '';
      }
      fontStylesObj[fontProps[item].property] = newProps[item];
      return '';
    }
    OtherProps[item] = props[item];
    return '';
  });
  const fontStyle = StyleSheet.create({
    font: fontStylesObj,
  });

  return (
    <Text style={[fontStyle.font, style]} {...OtherProps}>
      {children}
    </Text>
  );
};

export default Txt;
