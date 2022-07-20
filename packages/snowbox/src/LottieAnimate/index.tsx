import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import lottie from 'lottie-web';
import { THEME } from '../index';

/**
 * daySource: { day: require(), night: require()}
 */
type Props = {
  w: number;
  h: number;
  dataSource: any;
};

export default function Loading({ w, h, dataSource }: Props) {
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
