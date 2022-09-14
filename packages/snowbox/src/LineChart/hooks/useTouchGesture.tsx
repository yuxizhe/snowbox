import { useMemo, useRef } from 'react';
import { OS } from '../../index';
// import RNBridge from '@/common/js/RNBridge';
import { PanResponder } from 'react-native';

const useTouchGesture = ({ updateTouchInfoCallback }) => {
  const isWeb = OS === 'web';
  const timeoutRef = useRef<any>(null);
  const onStartTouchInfo = useRef({ x: -1, y: -1 });

  return {
    panResponder: useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onStartShouldSetPanResponder: () => true,
        // 其他视图想接管手势控制，不释放当前视图的控制
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: (event, gestureState) => {
          const {
            nativeEvent: { locationY, locationX },
          } = event;
          onStartTouchInfo.current = { x: locationX, y: locationY };
          timeoutRef.current = setTimeout(() => {
            updateTouchInfoCallback(onStartTouchInfo.current);
            // if (!isWeb) {
            //   RNBridge.gestureConfig({
            //     panBackDisable: true,
            //   });
            // }
          }, 200);
          return true;
        },
        onPanResponderMove: (event, gestureState) => {
          clearTimeout(timeoutRef.current);
          // if (!isWeb) {
          //   RNBridge.gestureConfig({
          //     panBackDisable: true,
          //   });
          // }
          const {
            nativeEvent: { locationY, locationX },
          } = event;
          updateTouchInfoCallback({ x: locationX, y: locationY });
          clearTimeout(timeoutRef.current);
          return true;
        },
        onPanResponderRelease: (event, gestureState) => {
          clearTimeout(timeoutRef.current);
          const {
            nativeEvent: {},
          } = event;
          updateTouchInfoCallback({ x: undefined, y: undefined });
          // if (!isWeb) {
          //   RNBridge.gestureConfig({
          //     panBackDisable: false,
          //   });
          // }
          return true;
        },
      }),
    ).current,
  };
};

export default useTouchGesture;
