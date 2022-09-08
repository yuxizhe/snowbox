import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import lottie from 'lottie-web';
import { THEME } from '../index';

/**
 * daySource: { day: require(), night: require()}
 */
type Props = {
  /**
   * 宽
   */
  w: number;
  /**
   * 高
   */
  h: number;
  /**
   * 动画数据 ，格式要求{ day: require('day.json'), night: require('night.json')}
   */
  dataSource: any;
};

export default function LottieAnimate({ w, h, dataSource }: Props) {
  const loadingRef = useRef<any>();

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: loadingRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: dataSource[THEME],
    });
    return () => {
      if (anim) {
        anim.destroy();
      }
    };
  }, []);

  return <View style={{ width: w, height: h }} ref={loadingRef} />;
}
