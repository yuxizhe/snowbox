import React from 'react';
import { StyleProp, Text } from 'react-native';
import { Txt } from '../';
import { fontTypes } from '../Utils/props';

type Props = {
  /**
   * 组件内的文本内容
   */
  children?: String;
  /**
   * 汉字文本属性
   */
  textProps: StyleProp<fontTypes>;
  /**
   * 数字文本属性
   */
  numProps: StyleProp<fontTypes>;
};

const TxtNum = ({ children, numProps, textProps, ...props }: Props) => {
  const isString = typeof children === 'string';

  if (isString) {
    const strArr = [];
    const childrenStr = String(children);
    const numberArr = childrenStr.match(/[+-]?\d+[,.\d]*[\d][%]?/gi) || [];
    childrenStr.split(/[+-]?\d+[,.\d]*[\d][%]?/gi).forEach((other, index) => {
      strArr.push({
        value: other,
        type: 'other',
      });
      strArr.push({
        value: numberArr[index] || '',
        type: 'number',
      });
    });

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
