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
  menus: {
    // 需要自定义侧边菜单的路径，没有配置的路径还是会使用自动生成的配置
    '/components': [
      {
        title: '基础组件',
        children: ['Box', 'Txt', 'color', 'position', 'autoScreen'],
      },
      {
        title: '展示组件',
        children: [
          'Card',
          'LineChart',
          'Icon',
          'Image',
          'TxtNum',
          'Badge',
          'ContrastBar',
          'StackedBar',
          'NoticeBar',
          'PieChart',
          'Progress',
          'SparkLines',
          'Empty',
          'Loading',
          'LinearGradient',
          'LottieAnimate',
          'Svg',
          'Steps',
          'TimeAxis',
          'Countdown',
          'Contributor',
        ],
      },
      {
        title: '交互组件',
        children: [
          'ActionSheet',
          'Button',
          'DatePicker',
          'ExpandTxt',
          'Modal',
          'Popup',
          'Swiper',
          'FloatView',
          'Tabs',
          'TabScrollView',
          'Press',
          'Checkbox',
          'Radio',
          'IntersectionObserver',
          'Password',
          'AnchorView',
          'Guide',
        ],
      },
      {
        title: '功能',
        children: ['CustomHooks'],
      },
    ],
  },
  styles: [
    `.__dumi-default-mobile-demo-layout { display: flex; height: 100vh }`,
    `.__dumi-default-mobile-demo-layout > div { display: flex; flex: 1; flex-direction: column; }`,
  ],
});
