import React from 'react';
import { View, StyleSheet } from 'react-native';
import { setGlobalVar, THEME, ThemeColor } from '.';

/**
 * Wrapper SSR 服务端渲染
 * web 同构 最外层适配
 */
function Wrapper(WrappedComponent) {
  return (props) => {
    const { URL: url, UA: ua, uid, theme } = props;
    const styles = style(theme);
    const version = '99.99';

    setGlobalVar({
      url,
      ua,
      uid,
      theme,
      version,
    });

    return (
      <View style={styles.web}>
        <View style={styles.webOuter}>
          <WrappedComponent {...props} theme={theme} url={url} />
        </View>
      </View>
    );
  };
}

const style = (theme) =>
  StyleSheet.create({
    web: {
      margin: 0,
      minHeight: '100vh',
      flexDirection: 'row',
      backgroundColor: ThemeColor.B020[theme],
    },
    webOuter: {
      flex: 1,
      maxWidth: 700,
      marginHorizontal: 'auto',
    },
  });

export default Wrapper;
