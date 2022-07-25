// @ts-nocheck
import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Box, XqText, THEME, ThemeColor } from '..';

interface Props {
  visible: boolean;
  modalTitle?: string;
  modalDesc?: string;
  cancelText?: string; // 取消按钮文字
  okText?: string; // 确认按钮文字
  onCancel?: () => void; // 取消按钮的回调
  onOk: () => void; // 点击确定回调
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
            <XqText size={15} level={2} style={styles.modalDesc}>
              {modalDesc}
            </XqText>
            <View style={[styles.footer, { borderColor: XQThemeColor.L010[theme] }]}>
              {onCancel ? (
                <>
                  <Box style={[styles.textStyle, { color: XQThemeColor.T020[theme] }]} onPress={onCancel}>
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
    paddingTop: 30,
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
    textAlign: 'left',
    lineHeight: 22,
    paddingHorizontal: 14,
  },
});

export default XqModal;
