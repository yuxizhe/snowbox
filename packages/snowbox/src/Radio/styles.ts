import { StyleSheet } from 'react-native';
import Color from '../theme/color.json';
import { getSize, THEME } from '..';

const RadioStyle = () =>
  StyleSheet.create({
    border: {
      borderStyle: 'solid',
      borderWidth: getSize(1) as number,
      borderColor: Color.T020[THEME],
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    disabled: {
      borderStyle: 'solid',
      borderWidth: getSize(1) as number,
      borderColor: Color.T040[THEME],
    },
    shadow: {
      shadowColor: Color.Blu010[THEME],
      shadowOffset: { width: 0, height: getSize(2) as number },
      shadowOpacity: 0.5,
      shadowRadius: getSize(6) as number,
      elevation: 3,
    },
    rotate: {
      transform: [{ rotate: '45deg' }],
    },
  });

export default RadioStyle;
