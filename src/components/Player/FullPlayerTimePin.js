import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  Platform,
  ViewPropTypes,
} from 'react-native'
import { colors, style, sizes } from '../../constants'
import { secondsToStringTime } from '../../utils/helpers'

class FullTimePin extends Component {
  static propTypes = {
    styleWrapper: ViewPropTypes.style,
    bottomTabsHeight: PropTypes.number,
  }

  static defaultProps = {
    bottomTabsHeight: 0,
  }

  constructor(props) {
    super(props)
    this.state = {
      currentTime: '0.00',
      totalTime: '0.00',
    }
    this.topAnimation = new Animated.Value(
      sizes.FULL_PLAYER_TIMELINE_TOP_HEIGHT -
        sizes.FULL_PLAYER_TIME_PIN_HEIGHT -
        12,
    )
    this.heightAnimation = new Animated.Value(sizes.FULL_PLAYER_TIME_PIN_HEIGHT)
    this.textAnimation = new Animated.Value(0)
    this.pinBgOpacityAnimation = new Animated.Value(1)
  }

  setTime = (currentTime, totalTime) => {
    this.setState({
      currentTime: secondsToStringTime(currentTime),
      totalTime: secondsToStringTime(totalTime),
    })
  }

  animateToRewindOn = () => {
    this._rewindAnimate(true)
  }

  animateToRewindOff = () => {
    this._rewindAnimate(false)
  }

  _rewindAnimate = (isRewinded = false) => {
    const { bottomTabsHeight } = this.props
    Animated.parallel([Animated.timing(this.topAnimation)]).stop()
    Animated.parallel([
      Platform.OS === 'ios'
        ? Animated.spring(this.topAnimation, {
            toValue: isRewinded
              ? bottomTabsHeight +
                sizes.FULL_PLAYER_TIMELINE_TOP_HEIGHT +
                sizes.FULL_PLAYER_TIMELINE_BOTTOM_HEIGHT -
                sizes.WINDOW_HEIGHT / 2
              : sizes.FULL_PLAYER_TIMELINE_TOP_HEIGHT -
                sizes.FULL_PLAYER_TIME_PIN_HEIGHT -
                12,
            bounciness: isRewinded ? 2 : 1,
            speed: isRewinded ? 2 : 4,
          })
        : Animated.timing(this.topAnimation, {
            toValue: isRewinded
              ? bottomTabsHeight +
                sizes.FULL_PLAYER_TIMELINE_TOP_HEIGHT +
                sizes.FULL_PLAYER_TIMELINE_BOTTOM_HEIGHT -
                sizes.WINDOW_HEIGHT / 2
              : sizes.FULL_PLAYER_TIMELINE_TOP_HEIGHT -
                sizes.FULL_PLAYER_TIME_PIN_HEIGHT -
                12,
            duration: 200,
            easing: Easing.bezier(0.5, 0, 0.5, 1),
          }),
      Animated.timing(this.heightAnimation, {
        toValue: isRewinded
          ? sizes.FULL_PLAYER_TIME_PIN_HEIGHT + 16
          : sizes.FULL_PLAYER_TIME_PIN_HEIGHT,
        duration: 200,
      }),
      Animated.timing(this.textAnimation, {
        toValue: isRewinded ? 1 : 0,
        duration: 200,
      }),
      Animated.timing(this.pinBgOpacityAnimation, {
        toValue: isRewinded ? 0 : 1,
        duration: 200,
      }),
    ]).start()
  }

  render() {
    const { currentTime, totalTime } = this.state
    const wrapperStyle = [
      styles.wrapper,
      this.props.styleWrapper,
      {
        top: this.topAnimation,
        height: this.heightAnimation,
      },
    ]
    const textStyle = [
      styles.text,
      {
        fontSize: this.textAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [16, 24],
        }),
        lineHeight: this.textAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [18, 24],
        }),
        paddingTop: this.textAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 4],
        }),
      },
    ]
    const pinBackgroundStyle = [
      styles.pinBackground,
      {
        opacity: this.pinBgOpacityAnimation,
      },
    ]

    return (
      <Animated.View style={wrapperStyle}>
        <View style={[styles.textContainer, styles.textContainerCurrent]}>
          <Animated.View style={pinBackgroundStyle} />
          <Animated.Text style={textStyle}>{currentTime}</Animated.Text>
        </View>
        <View style={[styles.textContainer, styles.textContainerTotal]}>
          <Animated.View style={pinBackgroundStyle} />
          <Animated.Text style={[textStyle, styles.textTotal]}>
            {totalTime}
          </Animated.Text>
        </View>
        <View style={styles.separator} />
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '100%',
    height: sizes.FULL_PLAYER_TIME_PIN_HEIGHT,
  },
  textContainer: {
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 6,
    position: 'absolute',
    bottom: 0,
    borderRadius: 2,
    overflow: 'hidden',
  },
  pinBackground: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    borderRadius: 2,
    backgroundColor: colors.BLACK_LABEL,
  },
  textContainerCurrent: {
    right: sizes.WINDOW_WIDTH / 2 - 1,
  },
  textContainerTotal: {
    left: sizes.WINDOW_WIDTH / 2,
  },
  text: {
    ...style.text.regular,
    color: colors.WHITE,
    fontSize: 16,
    lineHeight: 18,
  },
  textTotal: {
    color: colors.EXTRA_GRAY_LABEL,
  },
  separatorBackground: {
    backgroundColor: colors.BLACK_LABEL,
    position: 'absolute',
    width: 5,
    height: '100%',
  },
  separator: {
    backgroundColor: colors.EXTRA_GRAY_LABEL,
    width: 1,
    height: '100%',
    left: sizes.WINDOW_WIDTH / 2 - 0.2,
  },
})

export default FullTimePin
