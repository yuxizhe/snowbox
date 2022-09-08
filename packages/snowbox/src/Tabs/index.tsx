import React, { useState } from 'react';
import { Box, PButton, LayoutView } from '..';

type Props = {
  children?: any;
  /**
   * tab标题
   */
  title: string[];
  /**
   * 初始index
   */
  startIndex?: number;
  /**
   * 点击 回调，返回当前点击的index
   */
  onChange?: (changeParams: any) => void;
  /**
   * 是否禁用tabs滑动手势
   */
  locked?: boolean;
  /**
   * 顶部导航栏是否滚动，不滚动采用缩小字号的方式
   */
  tabBarScroll?: boolean;
};

/**
 * Tabs组件
 */
export default function Tabs({ children, title, onChange, startIndex = 0, ...props }: Props) {
  const [active, setActive] = useState(startIndex);
  const [fontSize, setFontSize] = useState(0);

  const change = (index) => {
    setActive(index);
    const changeParams = { from: active, i: index, ref: children[index] };
    onChange && onChange(changeParams);
  };

  const onTabsLayout = ({ nativeEvent: { layout } }) => {
    const { width } = layout;
    const tabSize = title.length || 1;
    const fonts = Math.floor(width / tabSize / getTitleMaxLength());
    setFontSize(fonts > 16 ? 16 : fonts);
  };

  const getTitleMaxLength = () => {
    let maxlength = 0;
    title.forEach((t) => {
      if (t.length > maxlength) {
        maxlength = t.length;
      }
    });
    return maxlength;
  };

  return (
    <Box col w="100%" {...props}>
      <LayoutView onLayout={onTabsLayout} style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        {title.map((item, index) => (
          <Box c flex={1} key={index}>
            <PButton py={0} onPress={() => change(index)}>
              {index === active ? (
                <Box py={8} f={fontSize || 0} fw="500" cl="T010">
                  {item}
                </Box>
              ) : (
                <Box py={8} f={fontSize || 0} cl="T020">
                  {item}
                </Box>
              )}
            </PButton>
            {index === active && <Box ab b={6} w={8} h={3} bg="T010" br={3} />}
          </Box>
        ))}
      </LayoutView>
      <Box flex={1} col>
        {children.map((item, index) => (index === active ? item : null))}
      </Box>
    </Box>
  );
}
