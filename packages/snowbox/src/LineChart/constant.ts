import { getRnSize } from '../index';

export default () => {
  const fontSize = getRnSize(10);
  const textYPadding = getRnSize(4);
  return {
    // 最小数据间隙
    minDataDistance: 0,
    // 显示两为小树
    keepRadixNumber: 2,
    fontSize,
    // 文字宽度
    perTextWidth: fontSize * 0.7,
    textXHeight: getRnSize(32),
    textYPadding,
    textXPadding: textYPadding,
    defalutColorValue: 'red',
  };
};

enum ShadowDirectionType {
  up = 1,
  down = 2,
}
export { ShadowDirectionType };
