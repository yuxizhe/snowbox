const RNBridgeClass = {
  redirect({ url }) {
    if (url && process.env.NODE_ENV === 'development') {
      window.location.href = url.replace('https://xueqiu.com', '');
      return '';
    }
    window.location.href = url;
    return '';
  },

  gestureConfig(params) {
    return {};
  },
};

export default RNBridgeClass;
