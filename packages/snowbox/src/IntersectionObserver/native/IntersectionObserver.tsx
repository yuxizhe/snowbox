import { LayoutRectangle, NativeScrollEvent } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import throttle from 'lodash/throttle';

export interface Root {
  node: any;
  horizontal: boolean;
  current: NativeScrollEvent;
  /**
   * 布局回调（初始化挂载、内容高度变化等）
   */
  onLayout?: () => void;
  /**
   * 滚动回调
   */
  onScroll?: (event: NativeScrollEvent) => void;
}

export interface ExposeTime {
  start: number;
  end: number;
}
export interface Element {
  // 是否在视线内
  inView: boolean;
  // 曝光开始和结束时间
  expose: ExposeTime;
  moduleName: string;
  layout: LayoutRectangle;
  /**
   * 计算布局
   */
  measureLayout: (node: any, callback: (x: number, y: number, width: number, height: number) => void) => void;
  /**
   * 布局回调（内容高度变化等）
   */
  onLayout?: () => void;
}

export interface IntersectionObserverEntry {
  target: Element;
  isIntersecting: boolean;
}

export interface RootMargin {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

export interface IntersectionObserverOptions {
  root: Root;
  rootMargin?: RootMargin;
}

export type IntersectionObserverCallback = (entries: IntersectionObserverEntry[]) => void;

export const defaultRootMargin: RootMargin = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

class IntersectionObserver {
  protected callback: IntersectionObserverCallback;

  protected options: IntersectionObserverOptions;

  protected targets: Element[];

  constructor(callback: IntersectionObserverCallback, options: IntersectionObserverOptions) {
    this.callback = callback;
    this.options = options;
    this.targets = [];
    this.options.root.onLayout = this.handleLayout;
    this.options.root.onScroll = this.handleScroll;
  }

  protected measureTarget = (target: Element) => {
    const rootNode = this.options.root.node;
    if (rootNode) {
      target.measureLayout(rootNode, (x, y, width, height) => {
        target.layout = {
          x,
          y,
          width,
          height,
        };
        this.handleScroll();
      });
    }
  };

  protected handleLayout = throttle(
    () => {
      for (let index = 0; index < this.targets.length; index += 1) {
        this.measureTarget(this.targets[index]);
      }
    },
    300,
    { leading: false, trailing: true },
  ); // TODO: 优化节流

  protected handleScroll = throttle(
    () => {
      const rootMargin = this.options?.rootMargin || defaultRootMargin;
      const {
        horizontal,
        current: {
          contentOffset, // 偏移量
          contentSize,
          layoutMeasurement, // 布局大小
        },
      } = this.options.root;
      if (
        contentSize.width <= 0 ||
        contentSize.height <= 0 ||
        layoutMeasurement.width <= 0 ||
        layoutMeasurement.height <= 0
      ) {
        return;
      }
      const contentOffsetWithLayout = horizontal
        ? contentOffset.x + layoutMeasurement.width
        : contentOffset.y + layoutMeasurement.height;
      const changedTargets: IntersectionObserverEntry[] = [];
      for (let index = 0; index < this.targets.length; index += 1) {
        const target = this.targets[index];
        const targetLayout: LayoutRectangle = target.layout;
        if (!targetLayout || targetLayout.width === 0 || targetLayout.height === 0) {
          // eslint-disable-next-line no-continue
          continue;
        }
        let isIntersecting = false;
        if (horizontal) {
          isIntersecting =
            contentOffsetWithLayout + (rootMargin.right || 0) >= targetLayout.x &&
            contentOffset.x - (rootMargin.left || 0) <= targetLayout.x + targetLayout.width;
        } else {
          isIntersecting =
            contentOffsetWithLayout + (rootMargin.bottom || 0) >= targetLayout.y &&
            contentOffset.y - (rootMargin.top || 0) <= targetLayout.y + targetLayout.height;
        }
        // 只有inview发生改变 或者 第一次渲染才会触发回调
        if (target.inView !== isIntersecting) {
          target.inView = isIntersecting;
          if (isIntersecting) {
            target.expose.start = Date.now();
            target.expose.end = 0;
          } else if (target.expose.start) target.expose.end = Date.now();
          changedTargets.push({
            target,
            isIntersecting,
          });
        }
      }
      this.callback(changedTargets);
    },
    100,
    { leading: false, trailing: true },
  ); // TODO: 优化节流

  public observe(target: Element) {
    const index = this.targets.indexOf(target);
    if (index < 0) {
      target.onLayout = this.handleLayout;
      this.targets.push(target);
    }
  }

  public unobserve(target: Element) {
    const index = this.targets.indexOf(target);
    if (index >= 0) {
      target.onLayout = undefined;
      this.targets.splice(index, 1);
    }
  }
}

export default IntersectionObserver;
