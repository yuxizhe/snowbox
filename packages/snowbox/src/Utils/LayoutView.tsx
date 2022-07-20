import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { OS } from './index';

// 解决ios12浏览器onLayout事件不触发的问题
const LayoutView = ({ onLayout, ...props }) => {
  const viewRef = useRef<any>();

  useEffect(() => {
    if (viewRef && viewRef.current && OS === 'web') {
      const { current } = viewRef;
      onLayout({
        nativeEvent: {
          layout: {
            x: current.clientLeft,
            y: current.clientTop,
            width: current.clientWidth,
            height: current.clientHeight,
          },
        },
      });
    }
  }, [viewRef]);

  const _onLayout = (e) => {
    if (OS !== 'web') {
      onLayout(e);
    }
  };

  return (
    <View {...props} ref={viewRef} onLayout={_onLayout}>
      {props.children}
    </View>
  );
};

export default LayoutView;
