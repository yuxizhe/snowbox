/**
 * 错误边界 高阶组件
 * https://zh-hans.reactjs.org/docs/error-boundaries.html
 * 
 * ts: https://www.pluralsight.com/guides/higher-order-composition-typescript-react
 */
import React from 'react';
import { View } from 'react-native';

function errorBoundary<T>(WrappedComponent: React.ComponentType<T>) {
  return class extends React.Component<T> {
    constructor(props) {
      super(props);
      this.state = {
        hasError: false,
      };
    }

    static getDerivedStateFromError() {
      // 更新 state 使下一次渲染能够显示降级后的 UI
      console.log('error');
      return { hasError: true };
    }

    render() {
      const { hasError } = this.state;
      return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        hasError ? <View /> : <WrappedComponent {...this.props} />
      );
    }
  };
}

export default errorBoundary;
