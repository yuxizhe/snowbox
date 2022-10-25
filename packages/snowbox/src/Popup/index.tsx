import React, { useEffect, useRef, useState } from 'react';
import { Animated, Modal, StyleSheet } from 'react-native';
import { Box, Img, Press, THEME } from '..';

const ZOOM_PARAMETER = 0.5;
const startAnimation = 150;
const hideAnimation = 150;

const CLOSE_ICON = {
  day: 'https://xqimg.imedao.com/1815fe763fbc5883fcaf2dbe.png',
  night: 'https://xqimg.imedao.com/1815fe7668ec5893fdef3ac3.png',
};

interface PopupProps {
  /**
   * 是否可见
   */
  visible: boolean;
  /**
   * 展示底部关闭按钮
   */
  showCloseIcon?: boolean;
  /**
   * 点击关闭按钮事件
   */
  onClose?: any;
  /**
   * 弹出层宽度
   */
  w?: any;
  /**
   * 弹出层高度
   */
  h?: any;
  /**
   * 是否展示弹出动画
   */
  showStartAnimation?: boolean;
  /**
   * 是否展示关闭动画
   */
  showHideAnimation?: boolean;
  children?: React.ReactNode;
}

const PopupBase: React.FC<PopupProps> = ({
  visible,
  children,
  showCloseIcon = true,
  onClose,
  w = 280,
  h = 378,
  showStartAnimation = true,
  showHideAnimation = false,
}) => {
  const [_visible, _setVisible] = useState(visible);
  const zoomAnim = useRef(new Animated.Value(ZOOM_PARAMETER)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let _hideAnimation = hideAnimation;
    let _startAnimation = startAnimation;
    if (!showHideAnimation) {
      _hideAnimation = 0;
    }
    if (!showStartAnimation) {
      _startAnimation = 0;
    }
    visible && _setVisible(true);
    Animated.parallel([
      Animated.timing(zoomAnim, {
        toValue: visible ? 1 : ZOOM_PARAMETER,
        duration: visible ? _startAnimation : _hideAnimation,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: visible ? 1 : 0,
        duration: visible ? _startAnimation : _hideAnimation,
        useNativeDriver: false,
      }),
    ]).start(() => visible || _setVisible(false));
  }, [visible, _setVisible]);

  return (
    <Modal visible={_visible} transparent onRequestClose={onClose}>
      <Box h="100%" w="100%" c>
        <Animated.View style={[styles.maskView, { opacity: opacityAnim }]}>
          <Animated.View style={[styles.container, { transform: [{ scale: zoomAnim }], opacity: opacityAnim }]}>
            <Box w={w} h={h} br={12} style={{ overflow: 'hidden' }}>
              {children}
            </Box>
            {showCloseIcon && (
              <Press onPress={onClose}>
                <Box mt={40}>
                  <Img source={{ uri: CLOSE_ICON[THEME] }} w={32} h={32} />
                </Box>
              </Press>
            )}
          </Animated.View>
        </Animated.View>
      </Box>
    </Modal>
  );
};

const styles = StyleSheet.create({
  maskView: {
    backgroundColor: 'rgba(0, 0, 0, .3)',
    // position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
});

export default PopupBase;
