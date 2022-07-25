import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { AppRegistry } from 'react-native';

// 服务端渲染样式
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const { renderPage } = ctx;
    AppRegistry.registerComponent('rn', () => Main);
    // @ts-ignore
    const { getStyleElement } = AppRegistry.getApplication('rn');
    const page = await renderPage();
    // 服务端渲染样式
    const styles = getStyleElement();
    return { ...page, styles };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
