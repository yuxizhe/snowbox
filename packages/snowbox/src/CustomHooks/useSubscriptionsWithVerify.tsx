import { useCallback, useEffect, useRef } from 'react';
import RNSubscriptions from '../Utils/RNSubscriptions';
import { parseParams } from '../Utils';

interface Options {
  /* 当前页面url */
  url: string;
  /* 当前页面moduleName */
  moduleName: string;
  /* 当前页面产品symbol */
  symbol?: string;
}

const judce = (arg, { moduleName = '', url = '', symbol }: Options) => {
  try {
    if (!arg) return true;
    // 如果是老的只会传一个modulenName
    if (typeof arg === 'string' && arg === moduleName) return true;
    let result = arg;
    // 这里parmas传值有差异
    // ios会传一个对象，android会传一个json字符串 老版本安卓是null（13.17之前）
    if (typeof arg === 'string') {
      result = JSON.parse(arg) || {};
    }
    const { url: _url = '', moduleName: _moduleName = '' } = result;
    // 只有有url参数才会进行url比对，否则使用老版本逻辑 （兼容一下老版本）
    // 13.19新增：调用方传了symbol就优先使用symbol判断，否则使用url参数判断
    if (symbol) {
      const { symbol: _symbol = '' } = parseParams(_url);
      return _symbol === symbol && _moduleName === moduleName;
    }
    if (_url && (_url !== url || _moduleName !== moduleName)) {
      return false;
    }
    return true;
  } catch (e) {
    console.log(e);
    return true;
  }
};

/*
 * 对订阅事件回传进行参数校验，防止重复页面订阅事件多次触发场景
 */
const useSubscriptionsWithVerify = (name: string, option: Options, callback: (...args: any[]) => any) => {
  const _callback = (...args) => {
    const result = args[0] || {};
    judce(result, option) && callback(...args);
  };

  const callbackRef = useRef(_callback);

  useEffect(() => {
    callbackRef.current = _callback;
  });

  const _callbackMemo = useCallback((...args) => {
    callbackRef.current.apply(null, args);
  }, []);

  useEffect(() => {
    const _subscriptCallback = RNSubscriptions[name];
    if (!_subscriptCallback) return;
    const bridge = _subscriptCallback(_callbackMemo);

    return () => {
      if (!_subscriptCallback) return;
      bridge.remove();
    };
  }, []);
};

export default useSubscriptionsWithVerify;
