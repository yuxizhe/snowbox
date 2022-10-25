import { StyleSheet } from 'react-native';
import Color from '../theme/color.json';
import { getSize } from '..';

export default (theme: string) =>
  StyleSheet.create({
    rangeBox: {
      flexWrap: 'wrap',
    },
    lineBox: {
      justifyContent: 'space-between',
    },
    item: {
      justifyContent: 'center',
    },
    marginItem: {
      marginRight: getSize(8),
    },
    itemCheck: {
      backgroundColor: Color.Blu010[theme],
      color: '#fff',
    },
    textWrap: {
      justifyContent: 'space-between',
    },
    textInput: {
      height: getSize(34),
      color: Color.Blu010[theme],
      borderRadius: getSize(4) as number,
      borderWidth: getSize(0.5) as number,
      borderColor: '#E5E8EE',
      textAlign: 'center',
      width: getSize(132),
    },
    textInputFocus: {
      borderBottomColor: Color.Blu010[theme],
    },
    btnFocus: {
      borderColor: Color.Blu010[theme],
      borderWidth: getSize(0.5) as number,
    },
    btnUnFocus: {
      borderColor: Color.L010[theme],
      borderWidth: getSize(0.5) as number,
    },
    hightLightSpace: {
      position: 'absolute',
      top: 48,
      left: 0,
      height: 48,
      backgroundColor: Color.B030[theme],
      borderRadius: 6,
      width: '100%',
    },
    displayNone: {
      display: 'none',
    },
  });
