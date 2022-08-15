import { NativeModules } from 'react-native';

const { RNBridge } = NativeModules;

export default class RNBridgeClass {
  rnCallbackID = Date.now();

  sendToReactNative = function (params) {
    // 给客户端一个唯一id作为标志
    if (typeof params === 'object') {
      params['cbID'] = '' + this.rnCallbackID;
      this.rnCallbackID += 1;
    }
    return typeof params === 'object' ? JSON.stringify(params) : params;
  };

  sendToNative(params) {
    return RNBridge.bridge(this.sendToReactNative(params));
  }

  redirect(params) {
    return this.sendToNative({ ...params, name: 'redirect' });
  }

  gestureConfig(params) {
    return this.sendToNative({ ...params, name: 'gestureConfig' });
  }
}
