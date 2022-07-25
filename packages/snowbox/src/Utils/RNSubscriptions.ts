import { NativeEventEmitter, NativeModules, DeviceEventEmitter, Platform } from 'react-native';

const { RNSubscription } = NativeModules;

const RNManagerEmitter = new NativeEventEmitter(RNSubscription);

const Manager = Platform.OS === 'ios' ? RNManagerEmitter : DeviceEventEmitter;

class RNSubscriptions {
  /**
   * nav button 点击回调
   * @param callback
   */
  rightNavigationButtonClickSubscription(callback) {
    return Manager.addListener('rightNavigationButtonClickSubscription', callback);
  }

  viewWillAppear(callback) {
    return Manager.addListener('viewWillAppear', callback);
  }

  viewDidAppear(callback) {
    return Manager.addListener('viewDidAppear', callback);
  }

  viewWillDisappear(callback) {
    return Manager.addListener('viewWillDisappear', callback);
  }

  updateUserFollowState(callback) {
    return Manager.addListener('updateUserFollowState', callback);
  }

  /**
   * 预约 唤起 同策略 弹窗
   */
  pfModalAppointmentTacticsFund(callback) {
    return Manager.addListener('pfModalAppointmentTacticsFund', callback);
  }

  /**
   * 预约 唤起 咨询投资者专家 弹窗
   */
  pfModalAppointmentContact(callback) {
    return Manager.addListener('pfModalAppointmentContact', callback);
  }

  /**
   * 预约 唤起 企微咨询 弹窗
   */
  pfModalAddWechatContact(callback) {
    return Manager.addListener('pfModalAddWechatContact', callback);
  }
}

export default new RNSubscriptions();
