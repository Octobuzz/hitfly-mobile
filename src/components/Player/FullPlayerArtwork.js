import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Image, Animated, Platform } from 'react-native'
import { colors, sizes } from '../../constants'

const IMAGE_WIDTH = sizes.WINDOW_WIDTH * 1.2

class FullPlayerArtwork extends Component {
  constructor(props) {
    super(props)
    this.leftAnimation = new Animated.Value(0)
    this.blurAnimation = new Animated.Value(0)
  }

  init = (currentTime, totalTime, isBlured = false) => {
    this.animateToTime(currentTime, totalTime)
    this._animateBlur(isBlured)
  }

  _getLeftPosition = (currentTime, totalTime) => {
    return -Math.trunc(((currentTime * IMAGE_WIDTH) / totalTime) * 10) / 10
  }

  animateToTime = (currentTime, totalTime) => {
    Animated.timing(this.leftAnimation, {
      toValue: this._getLeftPosition(currentTime, totalTime),
      duration: 0,
    }).start()
  }

  animateToBlur = () => {
    this._animateBlur(true)
  }

  animateToFocus = () => {
    this._animateBlur(false)
  }

  _animateBlur = (isBlured = false) => {
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
  isBlured: PropTypes.bool,
  source: PropTypes.number,
}

FullPlayerArtwork.defaultProps = {
  isBlured: false,
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
