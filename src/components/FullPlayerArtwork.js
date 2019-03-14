import R from 'ramda'
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Image, Animated, Platform } from 'react-native'
import { colors, sizes } from '../constants'

const IMAGE_WIDTH = sizes.WINDOW_WIDTH * 1.2

class FullPlayerArtwork extends Component {
  constructor(props) {
    super(props)
    const { totalTime, currentTime, isBlured } = props
    this.leftAnimation = new Animated.Value(
      this._getLeftPosition(totalTime, currentTime),
    )
    this.blurAnimation = new Animated.Value(isBlured ? 1 : 0)
  }

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.currentTime !== this.props.currentTime ||
      nextProps.totalTime !== this.props.totalTime
    ) {
      this._positionAnimate(nextProps.totalTime, nextProps.currentTime)
    }
    if (nextProps.isBlured !== this.props.isBlured) {
      this._playedAnimate(nextProps.isBlured)
    }
    if (!R.equals(nextProps.source, this.props.source)) {
      return true
    }
    return false
  }

  _getLeftPosition = (totalTime, currentTime) => {
    return -Math.trunc(((currentTime * IMAGE_WIDTH) / totalTime) * 10) / 10
  }

  _positionAnimate = (totalTime, currentTime) => {
    Animated.timing(this.leftAnimation, {
      toValue: this._getLeftPosition(totalTime, currentTime),
      duration: 0,
    }).start()
  }

  _playedAnimate = (isBlured = false) => {
    Animated.timing(this.blurAnimation).stop()
    Animated.timing(this.blurAnimation, {
      toValue: isBlured ? 1 : 0,
      duration: 200,
    }).start()
  }

  render() {
    const { source } = this.props
    const wrapperStyle = [
      styles.wrapper,
      {
        left: this.leftAnimation,
      },
    ]
    const blurContainerStyle = [
      styles.blurContainer,
      {
        opacity: this.blurAnimation,
      },
    ]
    const shadowStyle = [
      styles.shadow,
      {
        opacity: this.blurAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.2, 0.4],
        }),
      },
    ]

    return (
      <Fragment>
        <Animated.View style={wrapperStyle}>
          <Image style={styles.image} source={source} resizeMode="cover" />
          <Animated.View style={blurContainerStyle}>
            <Image
              style={styles.image}
              source={source}
              resizeMode="cover"
              blurRadius={Platform.OS === 'ios' ? 10 : 2}
            />
          </Animated.View>
        </Animated.View>
        <Animated.View style={shadowStyle} />
      </Fragment>
    )
  }
}

FullPlayerArtwork.propTypes = {
  currentTime: PropTypes.number,
  totalTime: PropTypes.number,
  isBlured: PropTypes.bool,
  source: PropTypes.number,
}

FullPlayerArtwork.defaultProps = {
  currentTime: 0,
  totalTime: 0,
  isBlured: false,
  bottomTabsHeight: 50,
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: IMAGE_WIDTH,
    height: sizes.WINDOW_HEIGHT,
    backgroundColor: colors.BLACK,
  },
  image: {
    flex: 1,
  },
  blurContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.BLACK_50,
  },
  blur: {
    flex: 1,
  },
  shadow: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.BLACK,
  },
})

export default FullPlayerArtwork
