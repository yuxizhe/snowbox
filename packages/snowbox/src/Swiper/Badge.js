import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { renderNode } from './renderNode';

const Badge = props => {
  const {
    containerStyle,
    textStyle,
    badgeStyle,
    onPress,
    Component = onPress ? TouchableOpacity : View,
    value,
    theme,
    status,
    ...attributes
  } = props;

  const element = renderNode(Text, value, {
    style: StyleSheet.flatten([styles.text, textStyle && textStyle]),
  });

  return (
    <View style={StyleSheet.flatten([containerStyle && containerStyle])}>
      <Component
        {...attributes}
        style={StyleSheet.flatten([
          styles.badge(theme, status),
          !element && styles.miniBadge,
          badgeStyle && badgeStyle,
        ])}
        onPress={onPress}
      >
        {element}
      </Component>
    </View>
  );
};

Badge.propTypes = {
  /*containerStyle: PropTypes.shape({
    style: PropTypes.any,
  }),*/
  containerStyle: PropTypes.array,
  /*badgeStyle: PropTypes.shape({
    style: PropTypes.any,
  }),*/
  badgeStyle: PropTypes.array,
  textStyle: PropTypes.shape({
    style: PropTypes.any,
  }),
  value: PropTypes.node,
  onPress: PropTypes.func,
  Component: PropTypes.func,
  theme: PropTypes.object,
  status: PropTypes.oneOf(['primary', 'success', 'warning', 'error']),
};

Badge.defaultProps = {
  status: 'primary',
};

const size = 18;
const miniSize = 8;

const styles = {
  badge: (theme, status) => ({
    alignSelf: 'center',
    minWidth: size,
    height: size,
    borderRadius: size / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors[status],
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#fff',
  }),
  miniBadge: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    minWidth: miniSize,
    height: miniSize,
    borderRadius: miniSize / 2,
  },
  text: {
    fontSize: 12,
    color: 'white',
    paddingHorizontal: 4,
  },
};

export { Badge };
