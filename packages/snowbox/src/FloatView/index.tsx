import { PanResponder, Dimensions, UIManager, Platform } from 'react-native';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Box from '../Box';
import { boxTypes } from '../Utils/props';

const { width, height } = Dimensions.get('window');

/* global 
AdsorptionType, 
FloatViewProps, 
left, 
right, 
both, 
recoveryLeft, 
recoveryRight, 
panEndMinTop, 
panEndMinBottom, 
adsorption,
onPress, 
onPanBegin,
onPanMove,
onPanEnd
*/
/* eslint no-undef: "error" */
/**
 * 拖动结束吸附类型
 */
enum AdsorptionType {
  /**
   * 左边
   */
  left,
  /**
   * 右边
   */
  right,
  /**
   * 根据组件中心点位于哪个区域来判断吸附在哪边
   */
  both,
}

type FloatViewProps = {
  /**
   * 拖动结束 吸附左边相对父组件的间距 默认13
   */
  recoveryLeft?: number;
  /**
   * 拖动结束 吸附在右边相对父组件的间距 默认13
   */
  recoveryRight?: number;
  /**
   * 拖动结束 底部相对父组件的最大间距 默认height - 200
   */
  panEndMinTop?: number;
  /**
   * 拖动结束 底部相对父组件的最小间距 默认40
   */
  panEndMinBottom?: number;
  /**
   * 拖动结束 吸附类型: 左边 右边 双边 默认右边
   */
  adsorption?: keyof typeof AdsorptionType;
  /**
   * 点击事件
   */
  onPress?: () => any;
  /**
   * 开始拖动事件
   */
  onPanBegin?: () => any;
  /**
   * 拖动中事件
   */
  onPanMove?: () => any;
  /**
   * 拖动结束事件
   */
  onPanEnd?: () => any;
} & boxTypes;

/**
 * 浮窗组件, 可拖动
 */
class FloatView extends Component<FloatViewProps, any> {
  isPressed: boolean = false;

  previousTranslateX: number = 0;

  previousTranslateY: number = 0;

  parentWidth: number = width;

  parentHeight: number = height;

  frame = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  panResponder: PanResponder;

  constructor(props) {
    super(props);
    // @ts-ignore
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    });
    this.state = {
      translateX: 0,
      translateY: 0,
    };
  }

  handleStartShouldSetPanResponder = () => {
    if (this.props.onPanBegin) {
      this.props.onPanBegin();
    }
    return true;
  };

  handleMoveShouldSetPanResponder = () => true;

  handlePanResponderGrant = () => {
    this.isPressed = true;
  };

  handlePanResponderMove = (event, gestureState) => {
    this.isPressed = gestureState.dx === 0 && gestureState.dy === 0;
    if (!this.isPressed) {
      this.onPanMove(gestureState.dx, gestureState.dy);
    }
  };

  handlePanResponderEnd = (event, gestureState) => {
    if (this.isPressed && this.props.onPress) {
      this.props.onPress();
      this.isPressed = false;
    } else {
      this.onPanEnd(gestureState.dx, gestureState.dy);
    }
  };

  onPanEnd = (x, y) => {
    let translateX = this.previousTranslateX + x;
    let translateY = this.previousTranslateY + y;
    const left = this.frame.x + translateX;
    const top = this.frame.y + translateY;
    const bottom = this.parentHeight - top - this.frame.height;
    const right = left + this.frame.width;

    if (top < this.props.panEndMinTop) {
      translateY = this.props.panEndMinTop - this.frame.y;
    }

    if (bottom < this.props.panEndMinBottom) {
      translateY = this.parentHeight - this.props.panEndMinBottom - this.frame.y - this.frame.height;
    }

    const isAdsorptionRight =
      this.props.adsorption === AdsorptionType.right ||
      (this.props.adsorption === AdsorptionType.both && (left + right) / 2 > this.parentWidth / 2);
    if (isAdsorptionRight) {
      translateX = this.parentWidth - this.props.recoveryRight - this.frame.x - this.frame.width;
    } else {
      translateX = this.props.recoveryLeft - this.frame.x;
    }
    this.previousTranslateX = translateX;
    this.previousTranslateY = translateY;

    this.setState({
      translateX,
      translateY,
    });

    if (this.props.onPanEnd) {
      this.props.onPanEnd();
    }
  };

  onPanMove = (x, y) => {
    this.setState({
      translateX: this.previousTranslateX + x,
      translateY: this.previousTranslateY + y,
    });

    if (this.props.onPanMove) {
      this.props.onPanMove();
    }
  };

  onLayout = (e) => {
    if (Platform.OS === 'web') {
      const dom = ReactDOM.findDOMNode(this);
      const node = dom.parentNode;
      this.parentWidth = node.clientWidth;
      this.parentHeight = node.clientHeight;
      const { x, y, height, width } = e.nativeEvent.layout;

      this.frame.x = x - this.previousTranslateX;
      this.frame.y = y - this.previousTranslateY;
      this.frame.width = width;
      this.frame.height = height;
    } else {
      UIManager.measureInWindow(e.target, (x, y, width, height) => {
        this.frame.x = x - this.previousTranslateX;
        this.frame.y = y - this.previousTranslateY;
        this.frame.width = width;
        this.frame.height = height;
      });
    }
  };

  render() {
    const props = {
      ...this.props,
      style: {
        // @ts-ignore
        ...this.props.style,
        transform: [{ translateY: this.state.translateY }, { translateX: this.state.translateX }],
      },
    };

    return (
      <Box
        ab
        onLayout={this.onLayout}
        {...props}
        // @ts-ignore
        {...this.panResponder.panHandlers}
      >
        {this.props.children}
      </Box>
    );
  }

  static defaultProps = {
    panEndMinTop: 200,
    panEndMinBottom: 80,
    recoveryLeft: 13,
    recoveryRight: 13,
    adsorption: 'right',
  };
}

export default FloatView;
