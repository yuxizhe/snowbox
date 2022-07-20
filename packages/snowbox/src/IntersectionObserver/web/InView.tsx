import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { OS } from '../../Utils';

export interface ExposeTime {
  start: number;
  end: number;
}
interface Element {
  // 是否在视线内
  inView: boolean;
  // 曝光开始和结束时间
  expose: ExposeTime;
  moduleName: string;
}

const InView = (props) => {
  const { onChange = () => {}, children, moduleName = '', ...otherprops } = props;
  const [element, setElement] = useState<Element>({
    inView: false,
    expose: {
      start: 0,
      end: 0,
    },
    moduleName,
  });

  const _callback = (inView) => {
    if (inView !== element.inView) {
      const temp = { ...element };
      temp.inView = inView;
      if (inView) {
        temp.expose.start = Date.now();
        temp.expose.end = 0;
      } else if (temp.expose.start) temp.expose.end = Date.now();
      setElement(temp);
      onChange(inView, temp);
    }
  };
  const ref = useRef(null);

  const callbackRef = useRef(_callback);

  useEffect(() => {
    callbackRef.current = _callback;
  });

  useEffect(() => {
    const noIntersectionObserver =
      typeof window !== 'object' ||
      OS !== 'web' ||
      !('IntersectionObserver' in window) ||
      !('IntersectionObserverEntry' in window) ||
      !('intersectionRatio' in window.IntersectionObserverEntry.prototype);

    if (noIntersectionObserver) return;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isInView = entry.intersectionRatio > 0;
          callbackRef.current(isInView);
        });
      },
      { threshold: [0] },
    );
    intersectionObserver.observe(ref.current);
    return () => {
      if (noIntersectionObserver) return;
      intersectionObserver.unobserve(ref.current);
    };
  }, []);

  return (
    <View ref={ref} {...otherprops}>
      {children}
    </View>
  );
};

export default InView;
