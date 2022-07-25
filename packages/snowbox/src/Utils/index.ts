import { Dimensions, Platform } from 'react-native';
import numeral from 'numeral';
import RNBridge from '../../common/RNBridge';
import compareVersions from 'compare-versions';
import colorJson from '../theme/color.json';

export const ThemeColor = colorJson;
export const DeviceWidth = Dimensions.get('window').width || 375;
const isNodeEnv = typeof process !== 'undefined' && process && process.versions && process.versions.node;
export const OS: 'ios' | 'android' | 'windows' | 'macos' | 'web' | 'node' = isNodeEnv ? 'node' : Platform.OS;

// eslint-disable-next-line import/no-mutable-exports
export let THEME = 'day';

// eslint-disable-next-line import/no-mutable-exports
export let gVar = {
  UA: '',
  URL: '',
  UID: '',
  THEME: 'day',
  VERSION: '',
};

export const setGlobalVar = (obj) => {
  const { uid, url, ua, theme, version } = obj;
  gVar = {
    UA: ua,
    URL: url,
    UID: uid,
    THEME: theme,
    VERSION: version,
  };
  THEME = theme;
};

export const Window: any =
  // @ts-ignore
  typeof window !== 'undefined' ? window : { location: { href: gVar.URL }, navigator: { userAgent: gVar.UA } };

/**
 * rn & web 同构适配大小
 * 支持SSR服务端渲染
 * web使用 采用vw rem布局方案
 */
export const getSize = (px: number): number | string => {
  // web端采用vw rem布局
  if (OS === 'web' || OS === 'node') {
    return `${px / 14}rem`;
  }

  return getRnSize(px);
};

/**
 * 获取rn适配大小
 * 只返回数字
 */
export const getRnSize = (px: number): number => {
  const uiWidth = 375;

  // pad 适配
  if (DeviceWidth > 700) {
    return px * 1.4;
  }

  // RN采用设计稿宽度适配布局
  return (px * DeviceWidth) / uiWidth;
};

export const getPercentValues = (value: string | number | null = null, stColor: number = 1) => {
  const colors = ['Grn010', 'Red010'];
  const v = Number(value);
  const change = stColor !== -1;
  const values = {
    color: 'T020',
    symbol: '',
    value: '--',
    percent: '',
  };
  if (Number.isNaN(v)) {
    return {
      ...values,
      value,
    };
  }
  if (value !== null) {
    if (v > 0) {
      values.symbol = '+';
      values.color = change ? colors[stColor] : 'T010';
    } else if (v < 0) {
      values.symbol = '-';
      values.color = change ? colors[1 - stColor] : 'T010';
    }
    return {
      ...values,
      value: `${Math.abs(v * 100).toFixed(2)}`,
      percent: '%',
    };
  }
  return values;
};

export function formatCurrencyNormal(num, { withPlus = false, withColor = false, stColor = 1 } = {}) {
  const colors = stColor === 1 ? ['Grn010', 'Red010'] : ['Red010', 'Grn010'];
  let color = 'T010';
  if (num === '--' || num === undefined) {
    return {
      value: '--',
      color,
    };
  }
  let numText = numeral(num).format('0,0.00');
  if (Math.abs(num) >= 100000000) {
    numText = `${numeral(num / 10000).format('0,0.00')}万`;
  }
  if (withPlus && num > 0) {
    numText = `+${numText}`;
  }
  if (withColor && num) {
    color = num > 0 ? colors[1] : colors[0];
  }
  return {
    value: numText,
    color,
  };
}

// [Image]常用图片后缀尺寸
type CommonSuffix =
  | '!topic.png'
  | '!800.jpg'
  | '!160x160.jpg'
  | '!custom.jpg'
  | '!750x200.jpg'
  | '!750x316.jpg'
  | '!750x528.jpg'
  | '!186x186.jpg'
  | '!186x186.jpg'
  | '!345x210.webp'
  | '!custom660.webp'
  | '!180x180.png'
  | '!100x100.png'
  | '!50x50.png'
  | '!60x60.png'
  | '!30x30.png';

export const getPicSuffixUrl = (url: string, suffix: CommonSuffix) => (!/!/.test(url) ? `${url}${suffix}` : url);

export function getWebCookieValue(name: string) {
  const result = Window.document.cookie.match(`(^|[^;\\w]+)\\s*${name}\\s*=\\s*([^;]+)`);
  return result ? result.pop() : '';
}
// 把 Date 对象转换为 ’YYYY-MM-DD' 格式
export const formatDate = (date: Date): string => {
  let yourDate = date;
  const offset = yourDate.getTimezoneOffset();
  yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
  return yourDate.toISOString().split('T')[0];
};

// 跳转至企业微信落地页面，13.17及之后支持
export function JumpToAddWeChat(isAddWechat: boolean, source: number, symbol?: string) {
  const add = isAddWechat ? 1 : 0;
  const symbolParams = symbol ? `&symbol=${symbol}` : '';
  const { UID: uid } = gVar;
  const getClientPath = () =>
    Platform.OS === 'android'
      ? `https://xueqiu.com/weapp?app_name=gh_7a080f2e543d&path=/pages/consultByWechatWebView/index&source=${source}&client=${Platform.OS}&add=${add}${symbolParams}`
      : `/pages/consultByWechatWebView/index?source=${source}&client=${Platform.OS}&add=${add}${symbolParams}`;
  const webUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd057d58484e30d9d&redirect_uri=${encodeURIComponent(
    `https://xueqiu.com/f/new/consultByWechat?source=${source}&uid=${uid}&add=${add}&client=h5${symbolParams}`,
  )}&response_type=code&scope=snsapi_base#wechat_redirect`;
  if (isGreaterOrEqualVersion('13.17')) {
    Platform.OS === 'web'
      ? RNBridge.redirect({
          type: 'PUSH',
          url: webUrl,
        })
      : RNBridge.jumpToMiniProgram({
          path: getClientPath(),
          miniProgramType: '0',
        });
  }
}

// 校验当前版本是否大于等于version
export function isGreaterOrEqualVersion(version: string) {
  try {
    return compareVersions(gVar.VERSION, version) >= 0;
  } catch (error) {
    console.log(error);
    return false;
  }
}

/**
 * 获取url params
 */
export const parseParams = (url = ''): any => {
  let href = url;

  if (OS === 'web') {
    href = Window.location.href;
  }

  const array = href.split('?');

  if (array.length === 1) {
    return {};
  }

  let query = '';
  query = array.pop();

  /* parseParams */
  const re = /([^&=]+)=?([^&]*)/g;
  const decodeRE = /\+/g;
  /* Regex for replacing addition symbol with a space */
  const decode = (str) => decodeURIComponent(str.replace(decodeRE, ' '));

  query = decodeURIComponent(query);
  const params = {};
  let e;
  while ((e = re.exec(query))) {
    let k = decode(e[1]);
    const v = decode(e[2]);
    if (k.substring(k.length - 2) === '[]') {
      k = k.substring(0, k.length - 2);
      (params[k] || (params[k] = [])).push(v);
    } else {
      params[k] = v;
    }
  }
  return params;
};

export const onPressGoToUrl = (url) => {
  if (!url) {
    return;
  }

  RNBridge.redirect({
    url,
    type: 'PUSH',
  });
};

export default {
  ThemeColor,
  OS,
  getSize,
  getRnSize,
  DeviceWidth,
  getPercentValues,
  getPicSuffixUrl,
  setGlobalVar,
  THEME,
  Window,
  gVar,
  formatDate,
  formatCurrencyNormal,
  JumpToAddWeChat,
  isGreaterOrEqualVersion,
};
