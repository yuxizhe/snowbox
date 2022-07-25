import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Dimensions, Image, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { getSize, Box, THEME } from '..';

const { width, height } = Dimensions.get('window');

const style = () =>
  StyleSheet.create({
    textContainer: {
      maxWidth: getSize(width * 0.8),
    },
    container: {
      zIndex: 1000,
    },
    displayNone: {
      display: 'none',
    },
  });

const uri = {
  1: 'https://xqimg.imedao.com/1806500804394a93fe1e2ed6.png',
  2: 'https://xqimg.imedao.com/180650081a596723fb733e2e.png',
};

export default function Toast({ msg = '', type = 0, timestamp = 0 }) {
  const styles = style();
  const [m, setM] = useState('');
  const [t, setT] = useState(0);
  const [ts, setTs] = useState(0);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    if (msg !== '' && timestamp !== ts && timestamp !== 0) {
      clearTimeout(id);
      setM(msg);
      setT(type);
      setTs(timestamp);
      // if (Platform.OS === 'ios') {
      //   RNBridge.toast({
      //     text: msg,
      //     type,
      //   });
      // } else {
      setShow(true);

      setId(
        // @ts-ignore
        setTimeout(() => {
          setShow(false);
        }, 2500),
      );
      // }
    }
  }, [msg, timestamp]);

  if (show) {
    return (
      <Box c ab t={-(height / 2 - 114)} b={0} style={styles.container}>
        <Box c py={10} px={20} br={20} bg={t < 2 ? 'Blu010' : 'Red011'} style={styles.textContainer}>
          <Box mr={6} style={t === 0 && styles.displayNone}>
            <Image
              source={{
                uri: uri[t],
              }}
              style={{
                width: getSize(16),
                height: getSize(16),
              }}
            />
          </Box>
          <Box f={16} cl={t < 2 ? 'T060' : 'Red010'}>
            {m}
          </Box>
        </Box>
      </Box>
    );
  }
  return null;
}

Toast.propTypes = {
  msg: PropTypes.string,
  type: PropTypes.number,
  timestamp: PropTypes.number,
};

Toast.defaultProps = {
  msg: '',
  type: 0,
  timestamp: 0,
};
