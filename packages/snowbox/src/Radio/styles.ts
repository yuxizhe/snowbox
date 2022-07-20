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
  });

export default RadioStyle;
