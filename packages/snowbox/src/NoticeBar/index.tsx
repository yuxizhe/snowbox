import React from 'react';
import { StyleSheet, TouchableOpacity, AppState } from 'react-native';
import debounce from 'lodash.debounce';
import Element from './ScrollElement';
import LayoutView from '../Utils/LayoutView';
import { OS, Press, Icon, Box } from '../';

/**
 * text: 滚动文字
 * bgColor: 背景颜色，如B010
 * textColor: 字体颜色
 * iconProps: 起始icon的自定义参数
 * style: 容器样式
 * url: 用于判断是否显示跳转icon
 * onPress: 点击事件
 */
class NoticeBar extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  state = {
    width: 0,
    singleWidth: 0,
    showHiddenBox: true,
    element: [],
    speed: 5000,
    visible: true,
    endX: 0,
  };

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentDidUpdate(prevProps, nextContent) {
    const currentText = this.props.text;
    const prevText = prevProps.text;
    if (currentText !== prevText) {
      this.resetElementContent();
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  onPress = () => {
    if (this.props.onPress && typeof this.props.onPress === 'function') {
      this.props.onPress();
    }
  };

  resetElementContent() {
    this.setState({
      element: [],
      showHiddenBox: true,
    });
  }

  props;

  noWrapStyle = OS === 'web' ? { whiteSpace: 'nowrap' } : {};

  handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'background') {
      this.setState({
        element: [],
      });
    } else if (nextAppState === 'active') {
      this.checkWidthValue();
    }
  };

  _handleAppStateChange = debounce(this.handleAppStateChange, 100);

  _onLayout = ({ nativeEvent: { layout } }) => {
    const { width } = layout;
    this.setState(
      {
        width: parseInt(width),
      },
      () => {
        this.checkWidthValue();
      },
    );
  };

  _onBoxLayout = ({ nativeEvent: { layout } }) => {
    const parseIntWidth = parseInt(layout.width);
    this.setState(
      {
        singleWidth: parseIntWidth + 20,
      },
      () => {
        this.checkWidthValue();
      },
    );
  };

  checkWidthValue = () => {
    const { width, singleWidth } = this.state;
    if (width && singleWidth) {
      const count = Math.ceil(width / singleWidth);
      const _element = new Array(count + 1).fill(0).map((e, index) => ({
        translateX: index * singleWidth,
        id: Math.random().toFixed(4),
      }));
      const endX = count * singleWidth;
      this.setState({
        element: _element,
        showHiddenBox: false,
        endX,
      });
    }
  };

  closeBar = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const bgColor = this.props.bgColor || 'B020';
    const textColor = this.props.textColor || 'T020';
    const iconProps = this.props.iconProps || {};
    if (!this.state.visible) {
      return <></>;
    }
    return (
      <Box px={12} py={8} flex={1} style={this.props.style}>
        <Box bg={bgColor} h={40} flex={1} br={6} px={12}>
          <Icon type="icon_s_explain_plane" {...iconProps} />
          <TouchableOpacity activeOpacity={1} style={styles.pressBox} onPress={this.onPress}>
            <LayoutView style={styles.container} onLayout={this._onLayout}>
              {this.state.showHiddenBox ? (
                <LayoutView onLayout={this._onBoxLayout} style={{ ...styles.hiddenBoxCon, ...this.noWrapStyle }}>
                  <Box style={styles.hiddenBox}>{this.props.text}</Box>
                </LayoutView>
              ) : (
                this.state.element.map((ele, index) => (
                  <Element
                    key={ele.id}
                    width={this.state.singleWidth}
                    data={ele}
                    conWidth={this.state.width}
                    speed={this.state.speed}
                    endX={this.state.endX}
                    textColor={textColor}
                  >
                    {this.props.text}
                  </Element>
                ))
              )}
            </LayoutView>
          </TouchableOpacity>
          {!!this.props.url && (
            <Box mr={10} ml={-8}>
              <Icon type="icon_s_more" w={14} h={14} />
            </Box>
          )}
          {!this.props.hideCloseBtn && (
            <Press onPress={this.closeBar}>
              <Icon type="icon_s_feeds_close" />
            </Press>
          )}
        </Box>
      </Box>
    );
  }
}

const styles = StyleSheet.create({
  pressBox: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    marginRight: 10,
    marginLeft: 5,
  },
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  hiddenBox: {
    color: 'transparent',
  },
  hiddenBoxCon: {
    position: 'absolute',
    flexShrink: 0,
  },
});

export default NoticeBar;
