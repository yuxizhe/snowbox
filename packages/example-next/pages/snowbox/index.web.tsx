import React from 'react';
import { Wrapper } from 'snowbox-ui';
import Head from 'next/head';
import Page from '.';

export default Wrapper(() => (
  <>
    <Head>
      <title>snowbox-ui同构组件库</title>
    </Head>
    <Page />
  </>
));
