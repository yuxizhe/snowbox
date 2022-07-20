import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { boxProps, boxTypes, sizeProps } from '../Utils/props';
import { getSize, ThemeColor, THEME } from '../Utils';
import Txt from '../Txt';

const Box = ({ style, children, noAuto = false, ...props }: boxTypes) => {
  const newProps = { ...props };

  // 默认横向 flex 且 垂直居中
  let boxStylesObj: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
  };

  const OtherProps = {};

  const childType = typeof children;

  const isText = ['boolean', 'string', 'number'].indexOf(childType) > -1;

  // 通用样式赋值
  Object.keys(newProps).map((item) => {
    // 尺寸类 屏幕适配
    if (!noAuto && sizeProps.indexOf(item) > -1 && typeof newProps[item] === 'number') {
      newProps[item] = getSize(newProps[item]);
    }

    if (item in boxProps) {
      // box颜色处理 bg backgroundColor  bc borderColor
      if (['bg', 'bc'].indexOf(item) > -1 && props[item] && props[item].indexOf('#') === -1) {
        boxStylesObj[boxProps[item].property] = (ThemeColor[props[item]] && ThemeColor[props[item]][THEME]) || 'white';
        return '';
      }
      // center 等值的处理
      if (boxProps[item].value && props[item]) {
        boxStylesObj = Object.assign(boxStylesObj, boxProps[item].value);
        return '';
      }
      boxStylesObj[boxProps[item].property] = newProps[item];
    }
    OtherProps[item] = props[item];
    return '';
  });
  const boxStyle = StyleSheet.create({
    box: boxStylesObj,
  });

  if (isText) {
    return (
      <View style={[boxStyle.box, style]}>
        <Txt style={style} noAuto={noAuto} {...OtherProps}>
          {children}
        </Txt>
      </View>
    );
  }
  return (
    <View style={[boxStyle.box, style]} {...OtherProps}>
      {children}
    </View>
  );
};

export default Box;
