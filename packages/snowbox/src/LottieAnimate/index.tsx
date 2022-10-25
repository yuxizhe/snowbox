import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import lottie from 'lottie-web';
import { THEME } from '../index';

/**
 * daySource: { day: xxx..., night: xxx... }
 */
type Props = {
  /**
   * 宽
   */
  w: number | string;
  /**
   * 高
   */
  h: number | string;
  /**
   * 动画数据 ，格式要求{ day: xxx..., night: xxx... }
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
