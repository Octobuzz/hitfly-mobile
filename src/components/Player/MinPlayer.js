import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Animated,
  PanResponder,
} from 'react-native'
import RNLinearGradient from 'react-native-linear-gradient'
import RNFastImage from 'react-native-fast-image'
import { colors, style, sizes, images } from '../../constants'
import { getNumberMultiple_05 } from '../../utils/helpers'

class MinPlayer extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    artwork: PropTypes.string,
    onPressPlay: PropTypes.func,
    onPressShowFullPlayer: PropTypes.func,
    onRewindStart: PropTypes.func,
    onRewindEnd: PropTypes.func,
    isPlayed: PropTypes.bool,
  }

  static defaultProps = {
    isPlayed: false,
  }

  constructor(props) {
    super(props)
    this.totalTime = 0
    this.minTimelineTranslateX_value = 0
    this.minTimelineTranslateX = new Animated.Value(0)

    this._timelineResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderGrant: this._onPanResponderStart,
      onPanResponderMove: this._onPanResponderMove,
      onPanResponderRelease: this._onPanResponderEnd,
      onPanResponderTerminate: this._onPanResponderEnd,
    })
  }

  init = (currentTime, totalTime) => {
    this.totalTime = totalTime
    this.animateToTime(currentTime, totalTime)
  }

  animateToTime = (currentTime, totalTime) => {
    const translateX = totalTime
      ? (currentTime * sizes.WINDOW_WIDTH) / totalTime
      : 0
    this._animateTimeline(translateX)
  }

  _onPanResponderStart = (event, gestureState) => {
    const { x0 } = gestureState
    const roundX0 = getNumberMultiple_05(x0)
    this.props.onRewindStart && this.props.onRewindStart()
    this._animateTimeline(roundX0)
  }

  _onPanResponderMove = (event, gestureState) => {
    const { x0, dx } = gestureState
    const roundX0 = getNumberMultiple_05(x0)
    const roundDx = getNumberMultiple_05(dx)
    this._animateTimeline(roundX0 + roundDx)
  }

  _onPanResponderEnd = (event, gestureState) => {
    const { dx, x0 } = gestureState
    const roundDx = getNumberMultiple_05(dx)
    const roundX0 = getNumberMultiple_05(x0)
    const timePosition = this._getTimeByTranslateX(roundX0 + roundDx)
    this._animateTimeline(roundX0 + roundDx)
    this.props.onRewindEnd && this.props.onRewindEnd(timePosition)
  }

  _getTimeByTranslateX = translateX => {
    return (
      Math.trunc((translateX * this.totalTime * 100) / sizes.WINDOW_WIDTH) / 100
    )
  }

  _animateTimeline = translateX => {
    if (this.minTimelineTranslateX_value !== translateX) {
      this.minTimelineTranslateX_value = translateX
      Animated.timing(this.minTimelineTranslateX, {
        toValue: translateX,
        duration: 0,
        useNativeDriver: true,
      }).start()
    }
  }

  render() {
    const {
      title,
      description,
      artwork,
      onPressShowFullPlayer,
      onPressPlay,
      isPlayed,
    } = this.props

    const minPlayertimelineGray = [
      styles.minPlayertimelineGray,
      {
        transform: [
          {
            translateX: this.minTimelineTranslateX,
          },
        ],
      },
    ]
    return (
      <View style={styles.wrapper}>
        <View {...this._timelineResponder.panHandlers}>
          <RNLinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.BRAND_BLUE, colors.BRAND_PINK]}
            style={styles.minPlyerTimeline}
          >
            <Animated.View style={minPlayertimelineGray}>
              <View style={styles.minPlayertimelineCursor} />
            </Animated.View>
          </RNLinearGradient>
        </View>
        <View style={styles.minPlayerRow}>
          <TouchableOpacity
            style={styles.minPlayerItemInfoRow}
            onPressOut={onPressShowFullPlayer}
          >
            <View style={styles.minPlayerArtworkContainer}>
              <View style={styles.minPlayerArtworkShadow}>
                {artwork ? (
                  <RNFastImage
                    source={{ uri: artwork }}
                    style={styles.minPlayerArtworkImage}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={images.MUSIC_ARTWORK_EMPTY_TRACK}
                    style={styles.minPlayerArtworkImage}
                    resizeMode="contain"
                  />
                )}
              </View>
            </View>
            <View style={styles.minPlayerItemInfo}>
              <Text style={styles.minPlayerItemTitle} numberOfLines={1}>
                {title}
              </Text>
              <Text style={styles.minPlayerItemDescription} numberOfLines={1}>
                {description}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.minPlayerPlayButton}
            onPress={onPressPlay}
            activeOpacity={0.6}
          >
            <Image
              source={
                isPlayed
                  ? images.CONTROL_BOTTOM_PLAYER_PAUSE
                  : images.CONTROL_BOTTOM_PLAYER_PLAY
              }
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: sizes.MIN_PLAYER_HEIGHT,
  },
  minPlyerTimeline: {
    flexDirection: 'row',
    height: sizes.MIN_PLAYER_TIMELINE_HEIGHT,
    backgroundColor: colors.PLAYER_TIMELINE_GRAY,
  },
  minPlayertimelineGray: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    transform: [
      {
        translateX: 0,
      },
    ],
    backgroundColor: colors.PLAYER_TIMELINE_GRAY,
    height: sizes.MIN_PLAYER_TIMELINE_HEIGHT,
  },
  minPlayertimelineCursor: {
    backgroundColor: colors.BLACK,
    position: 'absolute',
    top: 0,
    left: -2,
    width: 4,
    height: sizes.MIN_PLAYER_TIMELINE_HEIGHT,
  },
  minPlayerRow: {
    flexDirection: 'row',
  },
  minPlayerItemInfoRow: {
    flex: 1,
    flexDirection: 'row',
  },
  minPlayerArtworkContainer: {
    width: sizes.MIN_PLAYER_HEIGHT - sizes.MIN_PLAYER_TIMELINE_HEIGHT,
    height: sizes.MIN_PLAYER_HEIGHT - sizes.MIN_PLAYER_TIMELINE_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  minPlayerArtworkShadow: {
    width: 24,
    height: 24,
    shadowColor: colors.BLACK,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
  },
  minPlayerArtworkImage: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
  minPlayerItemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  minPlayerItemTitle: {
    ...style.text.bold,
    fontSize: 12,
    lineHeight: 14,
  },
  minPlayerItemDescription: {
    ...style.text.regular,
    fontSize: 8,
    lineHeight: 10,
  },
  minPlayerPlayButton: {
    width: sizes.MIN_PLAYER_HEIGHT - sizes.MIN_PLAYER_TIMELINE_HEIGHT,
    height: sizes.MIN_PLAYER_HEIGHT - sizes.MIN_PLAYER_TIMELINE_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default MinPlayer
