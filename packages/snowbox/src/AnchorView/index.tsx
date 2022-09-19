import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { OS } from '../index';

// 解决同构h5，异步渲染同级节点发生变化时，元素onLayout不触发
const AnchorView = ({ onLayout, ...props }) => {
  const viewRef: any = useRef<View>();

  useEffect(() => {
    if (viewRef?.current && (OS === 'web' || OS === 'node')) {
      const { current } = viewRef;
      current?.measure((x, y, width, height) => {
        onLayout({
          nativeEvent: {
            layout: {
              x,
              y,
              width,
              height,
            },
          },
        });
      });
    }
  });

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

export default AnchorView;
