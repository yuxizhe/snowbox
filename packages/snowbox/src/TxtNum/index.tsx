import React from 'react';
import { Text } from 'react-native';
import { Txt } from '../';
import { fontTypes } from '../Utils/props';

type Props = {
  /**
   * 组件内的文本内容
   */
  children?: string;
  /**
   * 汉字文本属性
   */
  textProps: fontTypes;
  /**
   * 数字文本属性
   */
  numProps: fontTypes;
};

const TxtNum = ({ children, numProps, textProps, ...props }: Props) => {
  const isString = typeof children === 'string';
  const textFont = textProps.f || 14;
  const numFont = numProps.f || 14;
  let maxLineHeight = Math.max(textFont, numFont) * 1.2;
  if (textProps.lh) {
    maxLineHeight = Math.max(textProps.lh, maxLineHeight);
  }
  if (numProps.lh) {
    maxLineHeight = Math.max(numProps.lh, maxLineHeight);
  }
  textProps.lh = maxLineHeight;
  numProps.lh = maxLineHeight;

  if (isString) {
    const strArr = [];
    const childrenStr = String(children);
    const numberArr = childrenStr.match(/[+-]?\d+(,[\d]+)*(\.[\d]+)?[%]?/gi) || [];
    if (numberArr.length) {
      let _childStr = childrenStr;
      numberArr.forEach((charStr) => {
        const index = _childStr.indexOf(charStr);
        strArr.push({
          value: _childStr.substring(0, index),
          type: 'other',
        });
        strArr.push({
          value: charStr,
          type: 'number',
        });
        _childStr = _childStr.substring(index + charStr.length);
      });
      if (_childStr) {
        strArr.push({
          value: _childStr,
          type: 'other',
        });
      }
    } else {
      strArr.push({
        value: childrenStr,
        type: 'other',
      });
    }

    return (
      <Text {...props}>
        {strArr.map((item) =>
          item.type === 'number' ? (
            <Txt {...Object(numProps)}>{item.value}</Txt>
          ) : (
            <Txt {...Object(textProps)}>{item.value}</Txt>
          ),
        )}
      </Text>
    );
  }
  return null;
};

export default TxtNum;
