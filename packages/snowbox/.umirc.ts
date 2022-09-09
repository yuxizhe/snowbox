import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'snowbox',
  favicon: 'https://xqimg.imedao.com/183204219991772b3fed0007.png',
  logo: 'https://xqimg.imedao.com/183204219991772b3fed0007.png',
  outputPath: 'docs-dist',
  mode: 'site',
  base: '/snowbox',
  publicPath: '/snowbox/',
  // more config: https://d.umijs.org/config
  extraBabelPlugins: [['react-native-web', { commonjs: true }]],
  // ...
  themeConfig: {
    carrier: 'snowbox', // 设备状态栏左侧的文本内容
    hd: {
      rules: [{ mode: 'vw', options: [14, 375] }],
      // 更多 rule 配置访问 https://github.com/umijs/dumi/blob/1.x/packages/theme-mobile/src/typings/config.d.ts#L7
    },
  },
});
