import React, { useEffect, useRef, useState, useContext } from 'react';
import { Modal, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Platform, Animated } from 'react-native';
import colorJson from '../theme/color.json';
import { Box, Press, Icon, Toast, getSize, THEME } from '..';

const ViewWidthDesign = 375;
const ViewHeightDesign = 375;

// 旋转90度
const transformComponents = (width, ChildrenComponent) => {
  const translateX = (ViewHeightDesign - width) / 2;
  return (
    <Box w={width} h={ViewHeightDesign}>
      <Box flex={1} style={{ transform: [{ rotate: '90deg' }] }}>
        <Box col bg="B020" w={ViewHeightDesign} h={width} style={{ transform: [{ translateX: -getSize(translateX) }] }}>
          {ChildrenComponent}
        </Box>
      </Box>
    </Box>
  );
};

interface ActionSheetProps {
  visible: boolean;
  /**
   * header 标题
   */
  headerTitle?: string;
  /**
   * header 左侧关闭按钮
   */
  showHeaderCloseIcon?: boolean;
  /**
   * header 右侧文字
   */
  headerRightText?: string;
  /**
   * contentPadding 内间距
   */
  contentPadding?: number;
  /**
   * contentMinHeight 最小高度
   */
  contentMinHeight?: number;
  /**
   * showFooter 展示footer
   */
  showFooter?: boolean;
  /**
   * showFooter 展示弹出动画
   */
  showStartAnimation?: boolean;
  /**
   * showFooter 展示关闭动画
   */
  showHideAnimation?: boolean;
  /**
   * persistTaps 当前界面有软键盘，点击 scrollview 后是否收起键盘
   */
  persistTaps?: 'never' | 'always' | 'handled';
  /**
   * footer 文字
   */
  footer?: string;
  /**
   * 内容
   */
  content: React.ReactElement;
  /**
   * header 左侧交互
   */
  onCloseIconClick?: () => void;
  /**
   * header 右侧交互
   */
  onHeaderRightClick?: () => void;
  /**
   * 回调会在用户按下 Android 设备上的后退按键时触发
   */
  onRequestClose?: () => void;
  /**
   * 底部按钮点击交互
   */
  onFooterClick?: () => void;
  /**
   * IOS: 当值为 true 时，如果内容范围比滚动视图本身大，在到达内容末尾的时候，可以弹性地拉动一截。
   * 默认为true
   */
  bounces?: boolean;
  /**
   * msgData toast
   */
  msgData?: { msg: string; type: 0 | 1 | 2; timestamp: number };
  /**
   * isLandscape: 是否横屏模式 旋转90度展示
   */
  isLandscape?: boolean;
}

// 弹窗动画展示时间
const startAnimation = 150;
const hideAnimation = 150;

const ActionSheet: React.FC<ActionSheetProps> = ({
  visible,
  headerTitle = '',
  showHeaderCloseIcon = true,
  content,
  footer = '确认',
  headerRightText = '',
  contentPadding = 16,
  contentMinHeight = 166,
  showFooter = true,
  showStartAnimation = true,
  showHideAnimation = true,
  onHeaderRightClick,
  onCloseIconClick,
  onRequestClose,
  onFooterClick,
  bounces = true,
  msgData = { msg: '', type: 0, timestamp: 0 },
  isLandscape = false,
  persistTaps = 'handled',
}) => {
  const bgColor = colorJson.B020[THEME];

  const activeAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [_visible, _setVisible] = useState(visible);
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
      Animated.timing(opacityAnim, {
        toValue: visible ? 1 : 0,
        duration: visible ? _startAnimation : _hideAnimation,
        useNativeDriver: false,
      }),
      Animated.timing(activeAnim, {
        toValue: visible ? 0 : 200,
        duration: visible ? _startAnimation : _hideAnimation,
        useNativeDriver: false,
      }),
    ]).start(() => visible || _setVisible(false));
  }, [visible, _setVisible]);

  const _body = (
    <Animated.View style={[styles.modalView, { transform: [{ translateY: activeAnim }], backgroundColor: bgColor }]}>
      {!!headerTitle && (
        <>
          <Box h={56}>
            <Box c flex={1} f={18} cl="T010" fw="500">
              {headerTitle}
            </Box>
            {showHeaderCloseIcon && (
              <Press ab f={14} l={16} onPress={onCloseIconClick || onFooterClick}>
                <Icon type="icon_m_close" w={18} h={18} />
              </Press>
            )}
            {!!headerRightText && (
              <Press ab r={16} onPress={onHeaderRightClick}>
                <Box f={14} cl="Blu010">
                  {headerRightText}
                </Box>
              </Press>
            )}
          </Box>
          <Box h={1} bg="B010" />
        </>
      )}
      <SafeAreaView>
        <Box p={contentPadding} style={{ alignItems: 'flex-start' }}>
          <ScrollView
            style={{ minHeight: contentMinHeight, maxHeight: isLandscape ? 319 : 400 }}
            showsVerticalScrollIndicator={false}
            bounces={bounces}
            keyboardShouldPersistTaps={persistTaps}
          >
            {content}
          </ScrollView>
        </Box>
        {!isLandscape && showFooter && (
          <>
            <Box h={6} bg="B010" />
            <Box h={56}>
              <TouchableOpacity style={{ flex: 1 }} onPress={onFooterClick} activeOpacity={0.8}>
                <Box c flex={1} f={18} cl="T010" fw="500">
                  {footer}
                </Box>
              </TouchableOpacity>
            </Box>
          </>
        )}
      </SafeAreaView>
    </Animated.View>
  );

  return (
    <Modal transparent visible={_visible} onRequestClose={onRequestClose || onCloseIconClick || onFooterClick}>
      <Animated.View style={[styles.container, { opacity: opacityAnim }]}>
        <Toast msg={msgData.msg} type={msgData.type} timestamp={msgData.timestamp} />
        {isLandscape ? transformComponents(ViewWidthDesign, _body) : _body}
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, .3)',
    flex: 1,
  },
  modalView: {
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    maxWidth: Platform.OS === 'web' ? 700 : '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});

export default ActionSheet;
