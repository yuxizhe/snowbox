import React, { cloneElement, useState } from 'react';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { Text } from 'react-native';
import ScrollTabBar from './ScrollTabBar';
import { Box, THEME, ThemeColor, Button } from '../index';
import { colorJson } from '../Utils/props';

type Props = {
  children?: any;

  theme: string;

  /**
   * tab标题
   */
  title: string[];

  /**
   * 初始index
   */
  startIndex?: number;

  /**
   * Tab指示器宽度
   */
  tabUnderlineWidth?: number;

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

const TabsNative = ({
  children,
  theme = 'day',
  title,
  onChange,
  startIndex = 0,
  tabUnderlineWidth = 8,
  locked,
  tabBarScroll = false,
  ...props
}: Props) => {
  const style = styles();

  const [lineLeft, setLineLeft] = useState(0);
  const [fontSize, setFontSize] = useState(0);

  const conLayout = ({ nativeEvent: { layout } }) => {
    const { width } = layout;
    const tabSize = title.length || 1;
    const left = width / (tabSize * 2) - tabUnderlineWidth / 2;
    setLineLeft(left);
    if (!tabBarScroll) {
      const fonts = Math.floor(width / tabSize / getTitleMaxLength());
      setFontSize(fonts > 16 ? 16 : fonts);
    } else {
      setFontSize(16);
    }
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

  const DefaultTabBarRenderTab = (name, page, isTabActive, onPressHandler) => {
    const fontWeight = isTabActive ? 'bold' : 'normal';
    const textColor = isTabActive ? colorJson.T010[THEME] : colorJson.T020[THEME];

    return (
      <Button style={{ flex: 1, height: 42 }} key={name} type="white" onPress={() => onPressHandler(page)}>
        <Text style={[{ color: textColor, fontWeight }, style.tabText(fontSize)]}>{name}</Text>
      </Button>
    );
  };

  const renderTabBar = () => {
    if (tabBarScroll) {
      return <ScrollTabBar underLineInnerColor={ThemeColor.T010[THEME]} />;
    }
    return <DefaultTabBar renderTab={DefaultTabBarRenderTab} style={style.tabBar} />;
  };

  return (
    <Box h="100%" onLayout={conLayout} {...props}>
      <ScrollableTabView
        style={style.container}
        initialPage={startIndex}
        renderTabBar={renderTabBar}
        tabBarTextStyle={tabBarScroll ? {} : style.tabText(fontSize)}
        tabBarUnderlineStyle={tabBarScroll ? {} : style.tabLine(lineLeft)}
        tabBarActiveTextColor={colorJson.T010[THEME]}
        tabBarInactiveTextColor={colorJson.T020[THEME]}
        onChangeTab={onChange}
        locked={locked}
      >
        {children.map((el, i) =>
          cloneElement(el, {
            tabLabel: title[i],
          }),
        )}
      </ScrollableTabView>
    </Box>
  );
};

function styles() {
  return {
    container: {
      backgroundColor: ThemeColor.B020[THEME],
      overflow: 'hidden',
    },
    tabBar: {
      height: 42,
      borderBottomWidth: 1,
      borderBottomColor: ThemeColor.B020[THEME],
    },
    tabLine: (left) => ({
      left,
      width: left ? 8 : 0,
      height: 3,
      bottom: 3,
      borderRadius: 2,
      backgroundColor: ThemeColor.T010[THEME],
    }),
    tabText: (fontSize) => ({
      paddingTop: 6,
      fontSize: fontSize || 0,
    }),
  };
}

export default TabsNative;
