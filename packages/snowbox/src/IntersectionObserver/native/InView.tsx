import React, { ComponentType, PureComponent, ReactElement, ReactNode, RefObject } from 'react';
import { LayoutChangeEvent, View, ViewProps } from 'react-native';

import IOContext, { IOCOntextValue } from './IOContext';
import { Element } from './IntersectionObserver';
import { ObserverInstance, ObserverInstanceCallback, ObserverInstanceCallbackOptions } from './IOManager';

export interface RenderProps {
  inView: boolean;
  onChange: (inView: boolean) => void;
}

export interface Props {
  [key: string]: any;
}

export type InViewProps<T extends Props = Props> = T & {
  /**
   * Render the wrapping element as this element.
   * @default `'View'`
   */
  as?: ComponentType<any>;
  children: ReactNode | ((fields: RenderProps) => ReactElement<View>);
  /** Only trigger the inView callback once */
  triggerOnce?: boolean;
  /** Call this function whenever the in view state changes */
  onChange?: ObserverInstanceCallback;
  moduleName?: string;
  onLayout?: (event: LayoutChangeEvent) => void;
};

export type InViewWrapper = ComponentType<{
  ref?: RefObject<any> | ((ref: any) => void);
  onLayout?: (event: LayoutChangeEvent) => void;
}>;

class InView<T = ViewProps> extends PureComponent<InViewProps<T>> {
  // eslint-disable-next-line react/sort-comp
  static contextType = IOContext;

  static defaultProps: Partial<InViewProps> = {
    triggerOnce: false,
    as: View,
  };

  // eslint-disable-next-line react/sort-comp
  context: undefined | IOCOntextValue;

  mounted = false;

  protected element: Element;

  protected instance: undefined | ObserverInstance;

  protected view: any;

  constructor(props: InViewProps<T>) {
    super(props);

    this.element = {
      inView: false,
      expose: {
        start: 0,
        end: 0,
      },
      moduleName: this.props.moduleName || '',
      layout: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      measureLayout: this.measureLayout,
    };
  }

  componentDidMount() {
    this.mounted = true;
    if (this.context?.manager) {
      this.instance = this.context.manager.observe(this.element, this.handleChange);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    if (this.context?.manager && this.instance) {
      this.context.manager.unobserve(this.element);
    }
  }

  protected handleChange = (inView: boolean, options: ObserverInstanceCallbackOptions) => {
    if (this.mounted) {
      const { triggerOnce, onChange } = this.props;
      if (inView && triggerOnce) {
        if (this.context?.manager) {
          this.context?.manager.unobserve(this.element);
        }
      }
      if (onChange) {
        onChange(inView, options);
      }
    }
  };

  protected handleRef = (ref: any) => {
    this.view = ref;
  };

  protected handleLayout = (event: LayoutChangeEvent) => {
    const {
      nativeEvent: { layout },
    } = event;
    if (layout.width !== this.element.layout.width || layout.height !== this.element.layout.height) {
      if (this.element.onLayout) {
        this.element.onLayout();
      }
    }
    const { onLayout } = this.props;
    if (onLayout) {
      onLayout(event);
    }
  };

  measureInWindow = (...args: any) => {
    this.view.measureInWindow(...args);
  };

  measureLayout = (...args: any) => {
    this.view.measureLayout(...args);
  };

  setNativeProps = (...args: any) => {
    this.view.setNativeProps(...args);
  };

  focus = (...args: any) => {
    this.view.focus(...args);
  };

  blur = (...args: any) => {
    this.view.blur(...args);
  };

  render() {
    const { as, children, ...props } = this.props;
    if (typeof children === 'function') {
      return null; // TODO: need?
    }
    const ViewComponent: InViewWrapper = (as || View) as InViewWrapper;
    return (
      // @ts-ignore
      <ViewComponent {...props} ref={this.handleRef} onLayout={this.handleLayout}>
        {children}
      </ViewComponent>
    );
  }
}

export default InView;
