import React from 'react';
import { Wrapper } from 'snowbox';
import Head from 'next/head';
import Page from '.';

// export default Wrapper(() => (
//   <>
//     <Head>
//       <title>SnowBox同构组件库</title>
//     </Head>
//     <Page />
//   </>
// ));

export default () => (
  <>
    <Head>
      <title>SnowBox同构组件库</title>
    </Head>
    <Page />
  </>
);
