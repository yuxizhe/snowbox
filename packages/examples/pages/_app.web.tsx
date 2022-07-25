import React from 'react';
import Head from 'next/head';
import 'snowbox/dist/assets/css/global.web.css';

function RnApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
        />
        <link
          rel="preload"
          href="https://assets.imedao.com/ugc/snowflake/font/DIN_Medium.ttf"
          as="font"
          crossOrigin="anonymous"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

/**
 * SSR 全局参数
 * 服务端渲染
 */
RnApp.getInitialProps = async (appContext) => {
  const { ctx } = appContext;
  const req = ctx.req || {};
  const UA = req.headers['user-agent'];
  const { url } = req;
  const uid = req.cookies && req.cookies.u;
  const theme = ctx.query.theme && ctx.query.theme === 'night' ? 'night' : 'day';

  const pageProps = {
    theme,
    URL: url,
    UA,
    uid,
  };

  return {
    pageProps,
  };
};

export default RnApp;
