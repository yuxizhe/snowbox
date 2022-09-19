import React, { useState } from 'react';
import { StyleSheet, TextInput, Modal } from 'react-native';
import { Box, Press } from '../';
import { getSize } from '../Utils';

interface PasswordProps {
  visible: boolean;
  title?: string;
  fundName?: string;
  amount?: string;
  desc?: string | React.ReactElement;
  onInputFinish: (password: string) => void;
  onCancel: () => void;
}

const Password: React.FC<PasswordProps> = ({
  visible,
  title = '请输入交易密码',
  fundName,
  amount,
  desc,
  onInputFinish,
  onCancel,
}) => {
  const [password, setPassword] = useState('');

  const getInput = () => {
    let inputItem: React.ReactElement[] = [];
    for (let i = 0; i < 6; i++) {
      inputItem.push(
        <Box key={i} mr={i < 5 ? 7 : 0} w={40} h={40} br={4} bg="B030" bw={1} bc="L010" c>
          {i < password.length ? <Box w={8} h={8} br={4} bg="T010" /> : null}
        </Box>,
      );
    }
    return inputItem;
  };

  const onInputChange = (text) => {
    const newText = text.replace(/[^\d]+/, '');
    setPassword(newText);
    if (newText.length === 6) {
      onInputFinish(newText);
    }
  };

  return (
    <Box style={styles.maskView}>
      <Modal animationType="fade" transparent={true} visible={visible}>
        <Box h="100%" c style={styles.maskView}>
          <Box px={12} w={315} bg="B020" br={12} col>
            <Box py={12} cl="T010" fw="500" f={16} c>
              {title}
            </Box>
            <Box w="100%" h={0.5} bg="L010" />
            {fundName ? (
              <Box pt={16} cl="T010" fw="500" f={16} c>
                {fundName}
              </Box>
            ) : null}
            {amount ? (
              <Box pt={8} pb={4} cl="T010" f={24} DIN c>
                {amount}
              </Box>
            ) : null}
            {desc ? (
              <Box cl="T020" f={12} c>
                {desc}
              </Box>
            ) : null}
            <Box mt={32} mb={16} c>
              <TextInput
                maxLength={6}
                keyboardType="number-pad"
                autoFocus={true}
                style={styles.numberInput}
                value={password}
                onChangeText={onInputChange}
              />
              {getInput()}
            </Box>
            <Box h={0.5} bg="L010" />
            <Box>
              <Press onPress={() => onCancel()} flex={1} col>
                <Box flex={1} h={50} cl="T010" f={16} c>
                  取消
                </Box>
              </Press>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

const styles = StyleSheet.create({
  maskView: {
    backgroundColor: 'rgba(0, 0, 0, .3)',
  },
  numberInput: {
    width: '100%',
    height: getSize(40),
    position: 'absolute',
    zIndex: 99,
    opacity: 0,
  },
});

export default Password;
