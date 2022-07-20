import { StyleSheet } from 'react-native';
import Color from '../theme/color.json';
import { getSize } from '..';

const RadioStyle = (theme: string) =>
  StyleSheet.create({
    border: {
      borderStyle: 'solid',
      borderWidth: getSize(1),
      borderColor: Color.T020[theme],
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    disabled: {
      borderStyle: 'solid',
      borderWidth: getSize(1),
      borderColor: Color.T040[theme],
    },
  });

export default RadioStyle;
