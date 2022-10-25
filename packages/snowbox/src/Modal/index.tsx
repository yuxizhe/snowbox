// @ts-nocheck
import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Box, XqText, THEME, ThemeColor } from '..';
import Txt from '../Txt';

interface Props {
  visible: boolean;
  /**
   * 确认弹窗标题
   */
  modalTitle?: string;
  /**
   * 确认弹窗文字
   */
  modalDesc?: React.ReactNode;
  /**
   * 取消按钮文字
   */
  cancelText?: string;
  /**
   * 确认按钮文字
   */
  okText?: string;
  /**
   * 取消按钮的回调
   */
  onCancel?: () => void;
  /**
   * 点击确定回调
   */
  onOk?: () => void;
}

const XqModal: React.FC<Props> = ({
  visible,
  modalTitle,
  modalDesc,
  cancelText = '取消',
  onCancel,
  onOk,
  okText = onCancel ? '确认' : '我知道了',
}) => {
  const theme = THEME;
  const XQThemeColor = ThemeColor;
  const content =
    modalDesc !== undefined && React.isValidElement(modalDesc) ? (
      <View>{modalDesc}</View>
    ) : (
      <Txt f={15} cl="T010" style={styles.modalDesc}>
        {modalDesc}
      </Txt>
    );
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent visible={visible}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: XQThemeColor.B030[theme] }]}>
            {!!modalTitle && (
              <XqText size={16} level={1} style={styles.modalTitle}>
                {modalTitle}
              </XqText>
            )}
            {content}
            {!!onOk && (
              <View style={[styles.footer, { borderColor: XQThemeColor.L010[theme] }]}>
                {onCancel ? (
                  <>
                    <Box style={[styles.textStyle, { color: XQThemeColor.T010[theme] }]} onPress={onCancel}>
                      {cancelText}
                    </Box>
                    <View style={[styles.divider, { backgroundColor: XQThemeColor.L010[theme] }]} />
                    <Box style={styles.textStyle} onPress={onOk}>
                      {okText}
                    </Box>
                  </>
                ) : (
                  <Box style={[styles.textStyle, { width: '100%' }]} onPress={onOk}>
                    {okText}
                  </Box>
                )}
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingTop: 20,
    width: 280,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    borderTopWidth: 0.5,
    borderColor: '#E8E8E8',
  },
  divider: {
    height: 18,
    width: 0.5,
    marginVertical: 16,
  },
  // openButton: {
  //   flex: 1,
  //   width: '50%',
  //   elevation: 2,
  // },
  textStyle: {
    flex: 1,
    color: '#3B7EEE',
    textAlign: 'center',
    // width: '50%',
    fontSize: 16,
    lineHeight: 50,
  },
  modalTitle: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  modalDesc: {
    marginBottom: 14,
    fontSize: 15,
    textAlign: 'justify',
    lineHeight: 22,
    paddingHorizontal: 14,
  },
});

export default XqModal;
