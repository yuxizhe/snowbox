// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

import { nodeType } from './nodeType';
import { renderNode } from './renderNode';

import { Badge } from './Badge';

const colors = {
  primary: '#2089dc',
  grey3: '#86939e',
};

const cellPositions = [
  'top-left',
  'top',
  'top-right',
  'left',
  'center',
  'right',
  'bottom-left',
  'bottom',
  'bottom-right',
];

export default class DefaultControls extends React.Component {
  dotsPos = (() => this._getPos(this.props.dotsPos, 'bottom', 'right'))();

  constructor(props) {
    super(props);

    this._renderRow = this._renderRow.bind(this);
    this._renderCell = this._renderCell.bind(this);
    this._renderDot = this._renderDot.bind(this);
  }

  _getPos(prop, horizontalDefault, verticalDefault) {
    return prop === false
      ? null
      : prop || (verticalDefault && this.props.vertical ? verticalDefault : horizontalDefault);
  }

  _renderDot({ isActive, onPress }) {
    const { dotProps = {}, dotActiveStyle } = this.props;
    const { containerStyle, badgeStyle, ...others } = dotProps;
    return (
      <Badge
        theme={{ colors }}
        containerStyle={[styles.dotsItemContainer, containerStyle]}
        badgeStyle={[styles.dotsItem({ colors }, isActive), badgeStyle, isActive && dotActiveStyle]}
        onPress={onPress}
        {...others}
      />
    );
  }

  _renderDots() {
    const {
      vertical,
      count,
      activeIndex,
      dotsTouchable,
      dotsWrapperStyle,
      DotComponent = this._renderDot,
      goTo,
    } = this.props;
    return (
      <View style={[styles.dotsWrapper(vertical), dotsWrapperStyle]}>
        {Array.from({ length: count }, (v, i) => i).map((index) => (
          <DotComponent
            key={index}
            index={index}
            activeIndex={activeIndex}
            isActive={activeIndex === index}
            onPress={!dotsTouchable ? undefined : () => goTo(index)}
          />
        ))}
      </View>
    );
  }

  _renderCell({ name }) {
    const { cellsStyle = {}, cellsContent = {} } = this.props;
    return (
      <View style={[styles.cell, cellsStyle[name]]}>
        {this.dotsPos === name && this._renderDots()}
        {cellsContent[name] && renderNode(Text, cellsContent[name])}
      </View>
    );
  }

  _renderRow({ rowAlign }) {
    const Cell = this._renderCell;
    const row = [
      `${!rowAlign ? '' : `${rowAlign}-`}left`,
      rowAlign || 'center',
      `${!rowAlign ? '' : `${rowAlign}-`}right`,
    ];
    const alignItems = ['flex-start', 'center', 'flex-end'];
    return (
      <View style={styles.row}>
        {row.map((name, index) => (
          <View key={name} style={styles.spaceHolder(alignItems[index])}>
            <Cell name={name} />
          </View>
        ))}
      </View>
    );
  }

  render() {
    const Row = this._renderRow;
    return (
      <>
        <Row rowAlign="top" contentAlign="flex-start" />
        <Row contentAlign="center" />
        <Row rowAlign="bottom" contentAlign="flex-end" />
      </>
    );
  }
}

DefaultControls.propTypes = {
  cellsStyle: PropTypes.shape(cellPositions.reduce((obj, item) => ({ ...obj, [item]: PropTypes.style }), {})),
  cellsContent: PropTypes.shape(cellPositions.reduce((obj, item) => ({ ...obj, [item]: nodeType }), {})),

  dotsPos: PropTypes.oneOf([...cellPositions, true, false]),
  prevPos: PropTypes.oneOf([...cellPositions, true, false]),
  nextPos: PropTypes.oneOf([...cellPositions, true, false]),
  prevTitle: PropTypes.string,
  nextTitle: PropTypes.string,

  dotsTouchable: PropTypes.bool,
  dotsWrapperStyle: PropTypes.shape({
    style: PropTypes.any,
  }),

  dotProps: PropTypes.shape(Badge.propTypes),
  dotActiveStyle: PropTypes.shape({
    style: PropTypes.any,
  }),
  DotComponent: PropTypes.func,

  prevTitleStyle: PropTypes.shape({
    style: PropTypes.any,
  }),
  nextTitleStyle: PropTypes.shape({
    style: PropTypes.any,
  }),
  PrevComponent: PropTypes.func,
  NextComponent: PropTypes.func,
  firstPrevElement: nodeType,
  lastNextElement: nodeType,

  theme: PropTypes.object,
  vertical: PropTypes.bool,
  count: PropTypes.number,
  activeIndex: PropTypes.number,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  goToPrev: PropTypes.func,
  goToNext: PropTypes.func,
  goTo: PropTypes.func,
};

DefaultControls.defaultProps = {
  prevTitle: 'Prev',
  nextTitle: 'Next',
};

const styles = {
  row: {
    flexDirection: 'row',
    height: 0,
    alignItems: 'center',
    margin: 20,
  },
  spaceHolder: (alignItems) => ({
    height: 0,
    flex: 1,
    alignItems,
    justifyContent: 'center',
  }),
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  dotsWrapper: (vertical) => ({
    flexDirection: vertical ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 1,
    minHeight: 1,
  }),
  dotsItemContainer: {
    margin: 3,
  },
  dotsItem: (theme, isActive) => ({
    backgroundColor: isActive ? theme.colors.primary : theme.colors.grey3,
    borderColor: 'transparent',
  }),
  hidden: {
    opacity: 0,
  },
};
