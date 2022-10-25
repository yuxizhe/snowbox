import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Animated,
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  // @ts-ignore
  ViewPropTypes,
  TouchableOpacity,
  // @ts-ignore
  TextPropTypes,
} from 'react-native';

const ScrollableTabBar: any = {
  propTypes: {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    scrollOffset: PropTypes.number,
    style: ViewPropTypes.style,
    tabStyle: ViewPropTypes.style,
    tabsContainerStyle: ViewPropTypes.style,
    textStyle: TextPropTypes.style,
    renderTab: PropTypes.func,
    underlineStyle: ViewPropTypes.style,
    onScroll: PropTypes.func,
    underLineInnerColor: PropTypes.string,
  },

  getDefaultProps() {
    return {
      scrollOffset: 52,
      activeTextColor: 'navy',
      inactiveTextColor: 'black',
      backgroundColor: null,
      style: {},
      tabStyle: {},
      tabsContainerStyle: {},
      underlineStyle: {},
      underLineInnerColor: '#101423',
    };
  },

  getInitialState() {
    this._tabsMeasurements = [];
    return {
      _leftTabUnderline: new Animated.Value(0),
      _widthTabUnderline: new Animated.Value(0),
      _containerWidth: null,
    };
  },

  componentDidMount() {
    this.props.scrollValue.addListener(this.updateView);
  },

  updateView(offset) {
    const position = Math.floor(offset.value);
    const pageOffset = offset.value % 1;
    const tabCount = this.props.tabs.length;
    const lastTabPosition = tabCount - 1;

    if (tabCount === 0 || offset.value < 0 || offset.value > lastTabPosition) {
      return;
    }
    if (this.necessarilyMeasurementsCompleted(position, position === lastTabPosition)) {
      this.updateTabPanel(position, pageOffset);
      this.updateTabUnderline(position, pageOffset, tabCount);
    }
  },

  necessarilyMeasurementsCompleted(position, isLastTab) {
    return (
      this._tabsMeasurements[position] &&
      (isLastTab || this._tabsMeasurements[position + 1]) &&
      this._tabContainerMeasurements &&
      this._containerMeasurements
    );
  },

  updateTabPanel(position, pageOffset) {
    const containerWidth = this._containerMeasurements.width;
    const tabWidth = this._tabsMeasurements[position].width;
    const nextTabMeasurements = this._tabsMeasurements[position + 1];
    const nextTabWidth = (nextTabMeasurements && nextTabMeasurements.width) || 0;
    const tabOffset = this._tabsMeasurements[position].left;
    const absolutePageOffset = pageOffset * tabWidth;
    let newScrollX = tabOffset + absolutePageOffset;

    // center tab and smooth tab change (for when tabWidth changes a lot between two tabs)
    newScrollX -= (containerWidth - (1 - pageOffset) * tabWidth - pageOffset * nextTabWidth) / 2;
    newScrollX = newScrollX >= 0 ? newScrollX : 0;
    if (Platform.OS === 'android') {
      this._scrollView.scrollTo({ x: newScrollX, y: 0, animated: false });
    } else {
      const rightBoundScroll = this._tabContainerMeasurements.width - this._containerMeasurements.width;
      newScrollX = newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX;
      this._scrollView.scrollTo({ x: newScrollX, y: 0, animated: false });
    }
  },

  updateTabUnderline(position, pageOffset, tabCount) {
    const lineLeft = this._tabsMeasurements[position].left;
    const lineRight = this._tabsMeasurements[position].right;

    if (position < tabCount - 1) {
      const nextTabLeft = this._tabsMeasurements[position + 1].left;
      const nextTabRight = this._tabsMeasurements[position + 1].right;

      const newLineLeft = pageOffset * nextTabLeft + (1 - pageOffset) * lineLeft;
      const newLineRight = pageOffset * nextTabRight + (1 - pageOffset) * lineRight;

      this.state._leftTabUnderline.setValue(newLineLeft);
      this.state._widthTabUnderline.setValue(newLineRight - newLineLeft);
    } else {
      this.state._leftTabUnderline.setValue(lineLeft);
      this.state._widthTabUnderline.setValue(lineRight - lineLeft);
    }
  },

  renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
    const { activeTextColor, inactiveTextColor, textStyle } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';

    return (
      <TouchableOpacity
        key={`${name}_${page}`}
        accessible
        activeOpacity={0.8}
        accessibilityLabel={name}
        onPress={() => onPressHandler(page)}
        onLayout={(ev) => this.measureTab(page, ev)}
      >
        <View style={[styles.tab, this.props.tabStyle]}>
          <Text style={[{ color: textColor, fontWeight, fontSize: 16 }, textStyle]}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  },

  measureTab(page, event) {
    const { x, width, height } = event.nativeEvent.layout;
    this._tabsMeasurements[page] = { left: x, right: x + width, width, height };
    // this.updateView({value: this.props.scrollValue.__getValue(), });
  },

  render() {
    const tabUnderlineStyle = {
      position: 'absolute',
      height: 3,
      bottom: 4,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    };

    const dynamicTabUnderline = {
      left: this.state._leftTabUnderline,
      width: this.state._widthTabUnderline,
    };

    const { onScroll } = this.props;

    return (
      <View
        style={[styles.container, { backgroundColor: this.props.backgroundColor }, this.props.style]}
        onLayout={this.onContainerLayout}
      >
        <ScrollView
          ref={(scrollView) => {
            this._scrollView = scrollView;
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          directionalLockEnabled
          bounces={false}
          scrollsToTop={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          <View
            style={[styles.tabs, { width: this.state._containerWidth }, this.props.tabsContainerStyle]}
            ref="tabContainer"
            onLayout={this.onTabContainerLayout}
          >
            {this.props.tabs.map((name, page) => {
              const isTabActive = this.props.activeTab === page;
              const renderTab = this.props.renderTab || this.renderTab;
              return renderTab(name, page, isTabActive, this.props.goToPage);
            })}
            <Animated.View style={[tabUnderlineStyle, dynamicTabUnderline, this.props.underlineStyle]}>
              <View style={[styles.underLineInner, { backgroundColor: this.props.underLineInnerColor }]} />
            </Animated.View>
          </View>
        </ScrollView>
      </View>
    );
  },

  componentDidUpdate(prevProps) {
    // If the tabs change, force the width of the tabs container to be recalculated
    if (JSON.stringify(prevProps.tabs) !== JSON.stringify(this.props.tabs) && this.state._containerWidth) {
      this.setState({ _containerWidth: null });
    }
  },

  onTabContainerLayout(e) {
    this._tabContainerMeasurements = e.nativeEvent.layout;
    const { width } = this._tabContainerMeasurements;
    // if (width < WINDOW_WIDTH) {
    //   width = WINDOW_WIDTH;
    // }
    this.setState({ _containerWidth: width });
    this.updateView({ value: this.props.scrollValue.__getValue() });
  },

  onContainerLayout(e) {
    this._containerMeasurements = e.nativeEvent.layout;
    this.updateView({ value: this.props.scrollValue.__getValue() });
  },
};

export default ScrollableTabBar;

const styles = StyleSheet.create({
  tab: {
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 13,
    paddingRight: 13,
  },
  container: {
    height: 42,
    borderWidth: 0,
  },
  tabs: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
  },
  underLineInner: {
    width: 8,
    height: 3,
    borderRadius: 3,
  },
});
