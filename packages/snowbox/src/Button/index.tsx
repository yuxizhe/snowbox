import React from 'react';
import { TouchableOpacity } from 'react-native';
import { getSize } from '../Utils';
import Box from '../Box';
import { buttonTypes } from '../Utils/props';

type Props = {
  /**
   * 尺寸, 大: l(默认)、中: m、小: s
   */
  size?: 'l' | 'm' | 's' | undefined;
  /**
   * 颜色类型, 主要: primary(默认)、次要: secondary、反白(白底): white
   */
  type?: 'primary' | 'secondary' | 'white';
  /**
   * true: 禁用
   */
  disabled?: boolean;
  /**
   * false: 禁用状态可点击，为了diabled态点击需要有提示
   */
  disabledClick?: boolean;
} & buttonTypes;

const Button = (props: Props) => {
  const {
    children,
    onPress,
    size = 'l',
    type = 'primary',
    disabled,
    ab,
    l,
    r,
    t,
    b,
    m,
    mx,
    my,
    ml,
    mr,
    mt,
    mb,
    disabledClick = true,
    ...otherProps
  } = props;
  const colorType = disabled ? `${type}Dis` : type;
  const gts = getSize;

  const marginList = {
    // margin系列加外层
    margin: m,
    marginHorizontal: mx,
    marginVertical: my,
    marginLeft: ml,
    marginRight: mr,
    marginTop: mt,
    marginBottom: mb,
  };

  const boxSize = {
    l: {
      // 大
      px: 0,
      h: 44,
      f: 16,
    },
    m: {
      // 中
      px: 12,
      h: 28,
      f: 14,
    },
    s: {
      // 小
      px: 8,
      h: 24,
      f: 12,
    },
  };

  const boxColor = {
    primary: {
      bg: 'Blu010', // 背景色
      cl: 'T060', // 文字色
    },
    primaryDis: {
      bg: 'Blu014',
      cl: 'TBlu016',
    },
    secondary: {
      bg: 'Blu015',
      cl: 'TBlu017',
    },
    secondaryDis: {
      bg: 'Blu016',
      cl: 'TBlu018',
    },
    white: {
      bg: 'B020',
      cl: 'TBlu017',
    },
    whiteDis: {
      bg: 'B020',
      cl: 'TBlu018',
    },
  };

  return ab ? (
    <Box ab l={l} r={r} t={t} b={b} w={size === 'l' ? '100%' : undefined}>
      <TouchableOpacity
        style={
          size === 'l'
            ? { flex: 1, flexDirection: 'row', ...marginList }
            : {
                minWidth: size === 'm' ? gts(66) : gts(52),
                height: gts(boxSize[size].h),
                ...marginList,
              }
        }
        onPress={onPress}
        disabled={disabled && disabledClick}
        activeOpacity={0.8}
        hitSlop={{ left: 8, right: 8, top: 8, bottom: 8 }}
      >
        <Box flex={1} br={100} c {...boxSize[size]} {...boxColor[colorType]} {...otherProps}>
          {children}
        </Box>
      </TouchableOpacity>
    </Box>
  ) : (
    // 大按钮宽度默认撑满，中小按钮宽度由内容撑开
    <TouchableOpacity
      style={
        size === 'l'
          ? { flex: 1, flexDirection: 'row', ...marginList }
          : {
              minWidth: size === 'm' ? gts(66) : gts(52),
              height: gts(boxSize[size].h),
              ...marginList,
            }
      }
      onPress={onPress}
      disabled={disabled && disabledClick}
      activeOpacity={0.8}
      hitSlop={{ left: 8, right: 8, top: 8, bottom: 8 }}
    >
      <Box flex={1} br={100} c {...boxSize[size]} {...boxColor[colorType]} {...otherProps}>
        {children}
      </Box>
    </TouchableOpacity>
  );
};

export default Button;
