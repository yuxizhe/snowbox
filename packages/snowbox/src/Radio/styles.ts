import { StyleSheet } from 'react-native';
import Color from '../theme/color.json';
import { getSize, THEME } from '..';

const RadioStyle = () =>
  StyleSheet.create({
    border: {
      borderStyle: 'solid',
      borderWidth: getSize(1),
      borderColor: Color.T020[THEME],
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    disabled: {
      borderStyle: 'solid',
      borderWidth: getSize(1),
      borderColor: Color.T040[THEME],
    },
    shadow: {
      shadowColor: Color.Blu010[THEME],
      shadowOffset: { width: 0, height: getSize(2) },
      shadowOpacity: 0.5,
      shadowRadius: getSize(6),
      elevation: 3,
    },
    rotate: {
      transform: [{ rotate: '45deg' }],
    },
  });

export default RadioStyle;
