// @ts-nocheck
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Animated, I18nManager, PanResponder, StyleSheet, View } from 'react-native';
import RNBridge from '../Utils/RNBridge';

import DefaultControls from './Controls';
import LayoutView from '../Utils/LayoutView';

const useNativeDriver = false; // because of RN #13377

export interface SwiperP {
  /**
   * Swiper Vertical Layout
   */
  vertical?: boolean;
  /**
   * initial slide index
   */
  from?: number;
  /**
   * Set to true to enable continuous loop mode
   */
  loop?: boolean;
  /**
   * Delay between auto play transitions (in second).
   */
  timeout?: number;
  /**
   * Function that returns boolean value.
   * Must return false to disable swiping mechanism.
   * Does not disable Prev / Next buttons
   */
  gesturesEnabled?: Function;
  /**
   * Tune spring animation on autoplay,
   * touch release or slides changes via buttons
   */
  springConfig?: Object;
  /**
   * Initiate animation after swipe this distance
   */
  minDistanceToCapture?: number;
  /**
   * Minimal part of swiper width
   * (or height for vertical)
   */
  minDistanceForAction?: number;
  /**
   * Any swiper animation start
   */
  onAnimationStart?: Function;
  /**
   * Any swiper animation end
   */
  onAnimationEnd?: Function;
  /**
   * 	Called when active index changed
   */
  onIndexChanged?: Function;
  /**
   * Swiper inner container position `fixed` instead `relative`
   */
  positionFixed?: boolean;
  /**
   * Outer (root) container style
   */
  containerStyle?: { style: Object };
  /**
   * Inner container style
   */
  innerContainerStyle?: { style: Object };
  /**
   * Swipe area style
   */
  swipeAreaStyle?: { style: Object };
  /**
   * Each slide wrapper style
   */
  slideWrapperStyle?: { style: Object };
  /**
   * Dots and control buttons visible and enabled
   */
  controlsEnabled?: boolean;
  /**
   * Custom controls component
   */
  Controls?: React.ReactNode;
  controlsProps?: Object;
}

class Swiper extends React.Component<SwiperP> {
  children = (() => React.Children.toArray(this.props.children))();

  count = (() => this.children.length)();

  startAutoplay() {
    const { timeout } = this.props;
    this.stopAutoplay();
    if (timeout) {
      this.autoplay = setTimeout(this._autoplayTimeout, Math.abs(timeout) * 1000);
    }
  }

  stopAutoplay() {
    this.autoplay && clearTimeout(this.autoplay);
  }

  goToNext() {
    this._goToNeighboring();
  }

  goToPrev() {
    this._goToNeighboring(true);
  }

  goTo(index = 0) {
    const delta = index - this.getActiveIndex();
    if (delta) {
      this._fixAndGo(delta);
    }
  }

  getActiveIndex() {
    return this.state.activeIndex;
  }

  // stop public methods

  _autoplayTimeout() {
    const { timeout } = this.props;
    this._goToNeighboring(timeout < 0);
  }

  _goToNeighboring(toPrev = false) {
    this._fixAndGo(toPrev ? -1 : 1);
  }

  constructor(props) {
    super(props);

    this._autoplayTimeout = this._autoplayTimeout.bind(this);
    this._onLayout = this._onLayout.bind(this);
    this._fixState = this._fixState.bind(this);

    this.goToPrev = this.goToPrev.bind(this);
    this.goToNext = this.goToNext.bind(this);
    this.goTo = this.goTo.bind(this);

    this.state = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      activeIndex: props.from,
      pan: new Animated.ValueXY(),
    };

    this._animatedValueX = 0;
    this._animatedValueY = 0;

    this._panResponder = PanResponder.create(this._getPanResponderCallbacks());
  }

  componentDidMount() {
    this.state.pan.x.addListener(({ value }) => (this._animatedValueX = value));
    this.state.pan.y.addListener(({ value }) => (this._animatedValueY = value));
    this.startAutoplay();
  }

  componentWillUnmount() {
    this.stopAutoplay();
    this.state.pan.x.removeAllListeners();
    this.state.pan.y.removeAllListeners();
  }

  _getPanResponderCallbacks() {
    const touchRelease = (e, gesture) => {
      const { vertical, minDistanceForAction, onAnimationEnd } = this.props;
      const { width, height } = this.state;

      this.startAutoplay();

      const correction = vertical ? gesture.moveY - gesture.y0 : gesture.moveX - gesture.x0;

      // console.log('correction', Math.abs(correction), width * minDistanceForAction);

      if (Math.abs(correction) < (vertical ? height : width) * minDistanceForAction) {
        this._spring({ x: 0, y: 0 });
      } else {
        this._changeIndex(
          correction > 0 ? (!vertical && I18nManager.isRTL ? 1 : -1) : !vertical && I18nManager.isRTL ? -1 : 1,
        );
      }
    };
    return {
      onPanResponderTerminationRequest: () => false,
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: (e, gestureState) => {
        const { gesturesEnabled, vertical, minDistanceToCapture } = this.props;

        if (!gesturesEnabled()) {
          return false;
        }

        const allow = Math.abs(vertical ? gestureState.dy : gestureState.dx) > minDistanceToCapture;
        // console.log('swiper capture', Math.abs(vertical ? gestureState.dy : gestureState.dx), minDistanceToCapture);
        if (allow) {
          this.props.onAnimationStart && this.props.onAnimationStart(this.getActiveIndex());
          this.stopAutoplay();
        }

        return allow;
      },
      onPanResponderGrant: () => this._fixState(),
      onPanResponderMove: Animated.event(
        [null, this.props.vertical ? { dy: this.state.pan.y } : { dx: this.state.pan.x }],
        {
          useNativeDriver: false,
        },
      ),
      onPanResponderRelease: touchRelease,
      onPanResponderTerminate: touchRelease,
    };
  }

  _spring(toValue) {
    const { springConfig, onAnimationEnd } = this.props;
    const { activeIndex } = this.state;
    onAnimationEnd && onAnimationEnd(activeIndex);
    Animated.spring(this.state.pan, {
      ...springConfig,
      toValue,
      useNativeDriver, // false, see top of file
      bounciness: 0,
    }).start(() => {});
  }

  _fixState() {
    const { vertical } = this.props;
    const { width, height, activeIndex } = this.state;
    this._animatedValueX = vertical ? 0 : width * activeIndex * (I18nManager.isRTL ? 1 : -1);
    this._animatedValueY = vertical ? height * activeIndex * -1 : 0;
    this.state.pan.setOffset({
      x: this._animatedValueX,
      y: this._animatedValueY,
    });
    this.state.pan.setValue({ x: 0, y: 0 });
  }

  _fixAndGo(delta) {
    this._fixState();
    this.props.onAnimationStart && this.props.onAnimationStart(this.getActiveIndex());
    this._changeIndex(delta);
  }

  _changeIndex(delta = 1) {
    const { loop, vertical } = this.props;
    const { width, height, activeIndex } = this.state;

    const toValue = { x: 0, y: 0 };
    let skipChanges = !delta;
    let calcDelta = delta;

    if (activeIndex <= 0 && delta < 0) {
      skipChanges = !loop;
      calcDelta = this.count + delta;
    } else if (activeIndex + 1 >= this.count && delta > 0) {
      skipChanges = !loop;
      calcDelta = -1 * activeIndex + delta - 1;
    }

    if (skipChanges) {
      return this._spring(toValue);
    }

    this.stopAutoplay();

    const index = activeIndex + calcDelta;
    this.setState({ activeIndex: index });

    if (vertical) {
      toValue.y = height * -1 * calcDelta;
    } else {
      toValue.x = width * (I18nManager.isRTL ? 1 : -1) * calcDelta;
    }
    this._spring(toValue);

    this.startAutoplay();
    this.props.onIndexChanged && this.props.onIndexChanged(index);
  }

  _onLayout({
    nativeEvent: {
      layout: { x, y, width, height },
    },
  }) {
    this.setState({ x, y, width, height }, () => this._fixState());
  }

  render() {
    const { pan, x, y, width, height } = this.state;

    const {
      theme,
      loop,
      vertical,
      positionFixed,
      containerStyle,
      innerContainerStyle,
      swipeAreaStyle,
      slideWrapperStyle,
      controlsEnabled,
      controlsProps,
      Controls = DefaultControls,
      onAnimationEnd,
    }: swiperP = this.props;

    return (
      <LayoutView
        style={[styles.root, containerStyle]}
        onLayout={this._onLayout}
        onTouchStart={() => {
          RNBridge.gestureConfig({
            panBackDisable: true,
          });
        }}
        onTouchEnd={() => {
          onAnimationEnd && onAnimationEnd();
          RNBridge.gestureConfig({
            panBackDisable: false,
          });
        }}
      >
        <View style={[styles.container(positionFixed, x, y, width, height), innerContainerStyle]}>
          <Animated.View
            style={[
              styles.swipeArea(vertical, this.count, width, height),
              swipeAreaStyle,
              {
                transform: [{ translateX: pan.x }, { translateY: pan.y }],
              },
            ]}
            {...this._panResponder.panHandlers}
          >
            {this.children.map((el, i) => (
              <View key={i} style={[{ width, height }, slideWrapperStyle]}>
                {cloneElement(el, {
                  activeIndex: this.getActiveIndex(),
                  index: i,
                  isActive: i === this.getActiveIndex(),
                })}
              </View>
            ))}
          </Animated.View>
          {controlsEnabled && (
            <Controls
              {...controlsProps}
              theme={theme}
              vertical={vertical}
              count={this.count}
              activeIndex={this.getActiveIndex()}
              isFirst={!loop && !this.getActiveIndex()}
              isLast={!loop && this.getActiveIndex() + 1 >= this.count}
              goToPrev={this.goToPrev}
              goToNext={this.goToNext}
              goTo={this.goTo}
            />
          )}
        </View>
      </LayoutView>
    );
  }
}

Swiper.propTypes = {
  vertical: PropTypes.bool,
  from: PropTypes.number,
  loop: PropTypes.bool,
  timeout: PropTypes.number,
  gesturesEnabled: PropTypes.func,
  springConfig: PropTypes.object,
  minDistanceToCapture: PropTypes.number, // inside ScrollView
  minDistanceForAction: PropTypes.number,

  onAnimationStart: PropTypes.func,
  onAnimationEnd: PropTypes.func,
  onIndexChanged: PropTypes.func,

  positionFixed: PropTypes.bool, // Fix safari vertical bounces
  containerStyle: PropTypes.shape({
    style: PropTypes.any,
  }),
  innerContainerStyle: PropTypes.shape({
    style: PropTypes.any,
  }),
  swipeAreaStyle: PropTypes.shape({
    style: PropTypes.any,
  }),
  slideWrapperStyle: PropTypes.shape({
    style: PropTypes.any,
  }),

  controlsEnabled: PropTypes.bool,
  controlsProps: PropTypes.shape(DefaultControls.propTypes),
  Controls: PropTypes.func,

  theme: PropTypes.object,
};

Swiper.defaultProps = {
  vertical: false,
  from: 0,
  loop: false,
  timeout: 0,
  gesturesEnabled: () => true,
  minDistanceToCapture: 5,
  minDistanceForAction: 0.1,
  positionFixed: false,
  controlsEnabled: true,
};

const styles = {
  root: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  // Fix web vertical scaling (like expo v33-34)
  container: (positionFixed, x, y, width, height) => ({
    backgroundColor: 'transparent',
    // Fix safari vertical bounces
    position: positionFixed ? 'fixed' : 'relative',
    overflow: 'hidden',
    top: positionFixed ? y : 0,
    left: positionFixed ? x : 0,
    width,
    height,
    justifyContent: 'space-between',
  }),
  swipeArea: (vertical, count, width, height) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: vertical ? width : width * count,
    height: vertical ? height * count : height,
    flexDirection: vertical ? 'column' : 'row',
  }),
};

export { Swiper };
