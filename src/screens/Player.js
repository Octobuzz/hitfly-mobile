import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Animated,
  Easing,
  ViewPropTypes,
  Platform,
  PanResponder,
} from 'react-native'
import { ifIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper'
import NavBarButton, {
  NAV_BAR_BUTTON_SHEVRON_DOWN_WHITE,
  NAV_BAR_BUTTON_USER_AVATAR,
} from './NavBarButton'
import {
  MinPlayer,
  FullPlayerArtwork,
  FullPlayerTimeLine,
  FullPlayerTimePin,
} from '../components/Player'
import { colors, sizes, style, images, names } from '../constants'
import { getNumberMultiple_05 } from '../utils/helpers'
import { Navigator } from '../navigation'

const MOVE_DETECT_BOUND = Platform.OS === 'ios' ? 2 : 4

class Player extends Component {
  constructor() {
    super()
    this.state = {
      bottomTabsHeight: 50,
      isPlayed: false,
      musicTitle: 'Killer Queen',
      musicDescription: 'Queen',
      timelineLevels: [
        1,
        0.24,
        0.27,
        0.25,
        0.9,
        0.15,
        0.3,
        0.12,
        0.28,
        0.4,
        0.5,
        0.2,
        0.21,
        0.77,
        0.22,
        0.2,
        0.14,
        0.23,
        0.6,
        0.78,
        0.79,
        0.8,
        0.16,
        0.17,
        0.18,
        0.3,
        0.32,
        0.36,
        0.37,
        0.76,
        0.55,
        0.56,
        0.57,
        0.58,
        0.47,
        0.48,
        0.55,
        0.56,
        0.57,
        0.58,
        0.47,
        0.48,
        0.49,
        0.53,
        0.19,
        0.49,
        0.53,
        0.19,
        0.31,
        0.35,
        0.92,
        0.7,
        0.68,
        0.29,
        0.85,
        0.36,
        0.37,
        0.49,
        0.53,
        0.19,
        0.31,
        0.11,
        0.3,
        0.59,
        0.61,
        0.62,
        0.41,
        0.42,
        0.75,
        0.64,
        0.72,
        0.44,
        0.45,
        0.46,
        0.49,
        0.53,
        0.19,
        0.31,
        0.65,
        0.66,
        0.53,
        0.19,
        0.31,
        0.11,
        0.3,
        0.59,
        0.61,
        0.62,
        0.41,
        0.42,
        0.75,
        0.64,
        0.72,
        0.44,
        0.93,
        0.87,
        0.34,
        0.54,
        0.86,
        0.63,
        0.33,
        0.51,
        0.63,
        0.52,
        0.9,
        0.91,
        0.6,
        0.82,
        0.83,
      ],
    }

    this.totalTime = 107.189
    this.currentTime = 12.6
    this.rewindTime = 0
    this.isRewinded = false
    this.isPlayed = false
    this.isFullScreen = false

    this.screenHeightAnimation = new Animated.Value(0)
    this.minTimelineTranslateX = new Animated.Value(0)
    this.minTimelineTranslateX_value = 0

    this.minPlayerRef = React.createRef()
    this.fullPlayerArtworkRef = React.createRef()
    this.fullPlayerTimeLineRef = React.createRef()
    this.fullPlayerTimePinRef = React.createRef()

    this.gestureState = {
      x0: 0,
      y0: 0,
      boundedX0: 0,
      boundedY0: 0,
      prevDx: 0,
      prevDy: 0,
      playerInitialGestureTime: 0,
      firstMoveDetected: false,
      initialMoveAxis: '',
      initialMoveDirection: '',
      lastMoveDirection: '',
    }

    this._fullPlayerTimelineResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderGrant: this._onPanResponderStart,
      onPanResponderMove: this._onPanResponderMove,
      onPanResponderRelease: this._onPanResponderEnd,
      onPanResponderTerminate: this._onPanResponderEnd,
    })
  }

  componentDidMount() {
    // FIXME: https://github.com/wix/react-native-navigation/issues/4737
    setTimeout(() => {
      Navigator.constants()
        .then(({ bottomTabsHeight = 0 }) => {
          this.setState(
            {
              bottomTabsHeight,
            },
            () => this._showMinPlayer(),
          )
        })
        .catch(e => {
          // console.log('error: ', e)
        })
    }, 500)

    this.minPlayerRef.current.init(this.currentTime, this.totalTime)
    this.fullPlayerArtworkRef.current.init(
      this.currentTime,
      this.totalTime,
      !this.isPlayed || this.isRewinded,
    )
    this.fullPlayerTimeLineRef.current.init(
      this.currentTime,
      this.totalTime,
      this.state.timelineLevels,
      this.isPlayed,
    )
    this.fullPlayerTimePinRef.current.setTime(this.currentTime, this.totalTime)
  }

  _onPanResponderStart = (event, gestureState) => {
    const { x0, y0 } = gestureState
    this.gestureState = {
      x0: getNumberMultiple_05(x0),
      y0: getNumberMultiple_05(y0),
      prevDx: 0,
      prevDy: 0,
      firstMoveDetected: false,
      initialMoveAxis: '',
      initialMoveDirection: '',
      lastMoveDirection: '',
    }
    // console.log(
    //   'жест начался: \n',
    //   `x0: ${getNumberMultiple_05(x0)} `,
    //   `y0: ${getNumberMultiple_05(y0)} `,
    // )
  }

  _onPanResponderMove = (event, gestureState) => {
    const { dx, dy, moveX, moveY } = gestureState
    const roundDx = getNumberMultiple_05(dx)
    const roundDy = getNumberMultiple_05(dy)
    const roundMoveX = getNumberMultiple_05(moveX)
    const roundMoveY = getNumberMultiple_05(moveY)

    // console.log(
    //   `перемещение? roundDx: ${roundDx} roundDy: ${roundDy} dx: ${dx} dy: ${dy} `,
    //   gestureState,
    // )
    // console.log(`перемещение?`)
    if (
      !this.gestureState.firstMoveDetected &&
      (Math.abs(roundDx) >= MOVE_DETECT_BOUND ||
        Math.abs(roundDy) >= MOVE_DETECT_BOUND)
    ) {
      if (Math.abs(roundDx) >= Math.abs(roundDy)) {
        this.gestureState = {
          ...this.gestureState,
          boundedX0: roundMoveX,
          boundedY0: roundMoveY,
          firstMoveDetected: true,
          initialMoveAxis: names.MOVES.HORIZONTAL,
          initialMoveDirection:
            roundDx > 0 ? names.MOVES.RIGHT : names.MOVES.LEFT,
          playerInitialGestureTime: this.currentTime,
          prevDx: roundDx,
          lastMoveDirection:
            roundDx > this.gestureState.prevDx
              ? names.MOVES.RIGHT
              : names.MOVES.LEFT,
        }
        this._onFullPlayerRewindStart()
        // console.log(
        //   `Обнаружено горизонтальное перемещение: ${
        //     this.gestureState.lastMoveDirection
        //   } dx: ${roundDx}`,
        // )
      } else {
        this.gestureState = {
          ...this.gestureState,
          boundedX0: roundMoveX,
          boundedY0: roundMoveY,
          firstMoveDetected: true,
          initialMoveAxis: names.MOVES.VERTICAL,
          initialMoveDirection: roundDy > 0 ? names.MOVES.DOWN : names.MOVES.UP,
          prevDy: roundDy,
          lastMoveDirection:
            roundDy > this.gestureState.prevDy
              ? names.MOVES.DOWN
              : names.MOVES.UP,
        }
        // console.log(
        //   `Обнаружено вертикальное перемещение: ${
        //     this.gestureState.lastMoveDirection
        //   } dy: ${roundDy}`,
        // )
      }
    } else if (this.gestureState.firstMoveDetected) {
      if (
        this.gestureState.initialMoveAxis === names.MOVES.HORIZONTAL &&
        this.gestureState.prevDx !== roundDx
      ) {
        this.gestureState = {
          ...this.gestureState,
          prevDx: roundDx,
          lastMoveDirection:
            roundDx > this.gestureState.prevDx
              ? names.MOVES.RIGHT
              : names.MOVES.LEFT,
        }
        this._onFullPlayerRewind(roundMoveX - this.gestureState.boundedX0)
        // console.log(
        //   `перемещение: ${this.gestureState.lastMoveDirection} dx: ${roundDx}`,
        // )
      } else if (
        this.gestureState.initialMoveAxis === names.MOVES.VERTICAL &&
        this.gestureState.prevDy !== roundDy
      ) {
        this.gestureState = {
          ...this.gestureState,
          prevDy: roundDy,
          lastMoveDirection:
            roundDy > this.gestureState.prevDy
              ? names.MOVES.DOWN
              : names.MOVES.UP,
        }
        if (this.gestureState.initialMoveDirection === names.MOVES.DOWN) {
          this._onVerticalScreenMove(roundMoveY - this.gestureState.boundedY0)
        }
        // console.log(
        //   `перемещение: ${this.gestureState.lastMoveDirection} dy: ${roundDy}`,
        // )
      }
    }
  }

  _onPanResponderEnd = (event, gestureState) => {
    const { moveY } = gestureState
    // const roundDx = getNumberMultiple_05(dx)
    // const roundDy = getNumberMultiple_05(dy)
    const roundMoveY = getNumberMultiple_05(moveY)
    // console.log(
    //   `жест завершен: ${
    //     this.gestureState.firstMoveDetected ? 'MOVED' : 'CLICKED'
    //   }  dx: ${roundDx} dy: ${roundDy}`,
    // )
    if (!this.gestureState.firstMoveDetected) {
      this._onPressPlayPause()
    } else {
      if (this.gestureState.initialMoveAxis === names.MOVES.HORIZONTAL) {
        this._onFullPlayerRewindEnd()
      } else if (this.gestureState.initialMoveDirection === names.MOVES.DOWN) {
        this._onVerticalScreenMoveEnd(
          this.gestureState.lastMoveDirection,
          roundMoveY - this.gestureState.boundedY0,
        )
      }
    }
    this.gestureState = {
      x0: 0,
      y0: 0,
      boundedX0: 0,
      boundedY0: 0,
      prevDx: 0,
      prevDy: 0,
      playerInitialGestureTime: 0,
      firstMoveDetected: false,
      initialMoveAxis: '',
      initialMoveDirection: '',
      lastMoveDirection: '',
    }
  }

  _onFullPlayerRewindStart = () => {
    this.isRewinded = true
    this.fullPlayerTimePinRef.current.animateToRewindOn()
    if (this.isPlayed) {
      this.fullPlayerArtworkRef.current.animateToBlur()
    }
  }

  _onFullPlayerRewind = dx => {
    let playerCurrentTime = this.gestureState.playerInitialGestureTime - dx
    let rewindOffset = 0
    if (playerCurrentTime >= this.totalTime) {
      rewindOffset = playerCurrentTime - this.totalTime
      playerCurrentTime = this.totalTime
    } else if (playerCurrentTime <= 0) {
      rewindOffset = playerCurrentTime
      playerCurrentTime = 0
    }
    this.rewindTime = playerCurrentTime
    this.fullPlayerTimePinRef.current.setTime(this.rewindTime, this.totalTime)
    this.fullPlayerTimeLineRef.current.animateToTime(
      this.rewindTime,
      this.totalTime,
      rewindOffset,
    )
    this.fullPlayerArtworkRef.current.animateToTime(
      this.rewindTime,
      this.totalTime,
    )
  }

  _onFullPlayerRewindEnd = () => {
    this.isRewinded = false
    this.currentTime = this.rewindTime
    this.rewindTime = 0
    this.fullPlayerTimePinRef.current.animateToRewindOff()
    this.fullPlayerTimeLineRef.current.animateToTime(
      this.currentTime,
      this.totalTime,
      0,
      true,
    )
    this.minPlayerRef.current.animateToTime(this.currentTime, this.totalTime)
    if (this.isPlayed) {
      this.fullPlayerArtworkRef.current.animateToFocus()
    }
  }

  _onMinPlayerRewindStart = time => {
    this.isRewinded = true
  }

  _onMinPlayerRewindEnd = time => {
    this.playerCurrentTime = time
    this.fullPlayerArtworkRef.current.animateToTime(time, this.totalTime)
    this.fullPlayerTimeLineRef.current.animateToTime(time, this.totalTime)
    this.fullPlayerTimePinRef.current.setTime(time, this.totalTime)
    this.isRewinded = false
  }

  _onPressPlayPause = () => {
    this.isPlayed = !this.isPlayed
    this.fullPlayerTimeLineRef.current.animatePlayPause(this.isPlayed)
    this.fullPlayerArtworkRef.current[
      this.isPlayed ? 'animateToFocus' : 'animateToBlur'
    ]()
    this.minPlayerRef.current.playPause(this.isPlayed)
  }

  _getVerticalMovePosition = dy => {
    if (sizes.WINDOW_HEIGHT - dy >= sizes.WINDOW_HEIGHT) {
      return sizes.WINDOW_HEIGHT
    } else if (sizes.WINDOW_HEIGHT - dy <= sizes.MIN_PLAYER_HEIGHT) {
      return sizes.MIN_PLAYER_HEIGHT
    } else {
      return sizes.WINDOW_HEIGHT - dy
    }
  }

  _onVerticalScreenMove = dy => {
    this._animateScreenHeight(this._getVerticalMovePosition(dy), 0)
  }

  _onVerticalScreenMoveEnd = (lastMoveDirection, dy) => {
    const movePosition = this._getVerticalMovePosition(dy)
    if (lastMoveDirection === names.MOVES.UP) {
      const duration =
        (400 * (sizes.WINDOW_HEIGHT - movePosition)) /
        (sizes.WINDOW_HEIGHT - sizes.MIN_PLAYER_HEIGHT)
      this._animateScreenHeight(sizes.WINDOW_HEIGHT, duration)
    } else {
      const duration =
        (400 * (movePosition - sizes.MIN_PLAYER_HEIGHT)) /
        (sizes.WINDOW_HEIGHT - sizes.MIN_PLAYER_HEIGHT)
      this._animateScreenHeight(sizes.MIN_PLAYER_HEIGHT, duration)
    }
  }

  _animateScreenHeight = (toValue, duration = 400) => {
    Animated.timing(this.screenHeightAnimation, {
      toValue,
      duration,
      easing: duration ? Easing.bezier(0.5, 0, 0.5, 1) : Easing.linear,
    }).start()
  }

  _showMinPlayer = () => {
    this._animateScreenHeight(sizes.MIN_PLAYER_HEIGHT)
  }

  _showFullScreenPlayer = () => {
    this._animateScreenHeight(sizes.WINDOW_HEIGHT)
  }

  render() {
    const { bottomTabsHeight } = this.state
    const screenContainer = [
      styles.wrapper,
      {
        height: this.screenHeightAnimation,
        bottom: this.screenHeightAnimation.interpolate({
          inputRange: [
            0,
            sizes.MIN_PLAYER_HEIGHT,
            (sizes.MIN_PLAYER_HEIGHT + bottomTabsHeight) * 1.4,
            sizes.WINDOW_HEIGHT,
          ],
          outputRange: [bottomTabsHeight, bottomTabsHeight, 0, 0],
        }),
        backgroundColor: this.screenHeightAnimation.interpolate({
          inputRange: [0, sizes.MIN_PLAYER_HEIGHT, sizes.WINDOW_HEIGHT],
          outputRange: [colors.TRANSPARENT, colors.WHITE, colors.BLACK],
        }),
      },
      this.props.wrapperStyle,
    ]
    const minPlayerContainer = [
      styles.minPlayerContainer,
      {
        opacity: this.screenHeightAnimation.interpolate({
          inputRange: [
            0,
            sizes.MIN_PLAYER_HEIGHT,
            (sizes.MIN_PLAYER_HEIGHT + bottomTabsHeight) * 1.4,
            sizes.WINDOW_HEIGHT,
          ],
          outputRange: [1, 1, 0, 0],
        }),
        height: this.screenHeightAnimation.interpolate({
          inputRange: [
            0,
            sizes.MIN_PLAYER_HEIGHT,
            (sizes.MIN_PLAYER_HEIGHT + bottomTabsHeight) * 1.4,
            (sizes.MIN_PLAYER_HEIGHT + bottomTabsHeight) * 1.4 + 1,
            sizes.WINDOW_HEIGHT,
          ],
          outputRange: [
            sizes.MIN_PLAYER_HEIGHT,
            sizes.MIN_PLAYER_HEIGHT,
            sizes.MIN_PLAYER_HEIGHT,
            0,
            0,
          ],
        }),
      },
    ]
    const minPlayerBottomWhiteSpace = [
      styles.minPlayerBottomWhiteSpace,
      {
        opacity: this.screenHeightAnimation.interpolate({
          inputRange: [
            0,
            sizes.MIN_PLAYER_HEIGHT,
            (sizes.MIN_PLAYER_HEIGHT + bottomTabsHeight) * 1.4,
            sizes.WINDOW_HEIGHT,
          ],
          outputRange: [1, 1, 0, 0],
        }),
        height: this.screenHeightAnimation.interpolate({
          inputRange: [
            0,
            sizes.MIN_PLAYER_HEIGHT,
            (sizes.MIN_PLAYER_HEIGHT + bottomTabsHeight) * 1.4,
            (sizes.MIN_PLAYER_HEIGHT + bottomTabsHeight) * 1.4 + 1,
            sizes.WINDOW_HEIGHT,
          ],
          outputRange: [
            sizes.WINDOW_HEIGHT,
            sizes.WINDOW_HEIGHT,
            sizes.WINDOW_HEIGHT,
            0,
            0,
          ],
        }),
      },
    ]
    const fullPlayerBottomBarStyle = [
      styles.fullPlayerBottomBar,
      {
        height: bottomTabsHeight,
      },
    ]

    return (
      <Animated.View style={screenContainer}>
        <FullPlayerArtwork
          source={images.TEMP_ARTWORK_MAX}
          currentTime={this.playerCurrentTime}
          totalTime={this.playerTotalTime}
          ref={this.fullPlayerArtworkRef}
        />
        <View style={styles.fullPlayerContainer}>
          <View style={styles.navbar}>
            <NavBarButton
              type={NAV_BAR_BUTTON_SHEVRON_DOWN_WHITE}
              onPress={this._showMinPlayer}
            />
            <View
              style={styles.navbarCenterSpace}
              {...this._fullPlayerTimelineResponder.panHandlers}
            />
            <NavBarButton type={NAV_BAR_BUTTON_USER_AVATAR} />
          </View>

          <View
            style={styles.fullPlayerMusicText}
            {...this._fullPlayerTimelineResponder.panHandlers}
          >
            <Text style={styles.fullPlayerTitle}>{this.state.musicTitle}</Text>
            <Text style={styles.fullPlayerArtist}>
              {this.state.musicDescription}
            </Text>
          </View>

          <View
            style={styles.fullPlayerCenterSpace}
            {...this._fullPlayerTimelineResponder.panHandlers}
          />
          <View
            style={styles.fullPlayerTimelineContainer}
            {...this._fullPlayerTimelineResponder.panHandlers}
          >
            <FullPlayerTimeLine
              levels={this.state.timelineLevels}
              ref={this.fullPlayerTimeLineRef}
            />
            <FullPlayerTimePin
              bottomTabsHeight={bottomTabsHeight}
              ref={this.fullPlayerTimePinRef}
            />
          </View>
          <View style={fullPlayerBottomBarStyle}>
            <TouchableOpacity style={styles.fullPlayerBarButton}>
              <Image source={images.CONTROL_PLUS_WHITE} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.fullPlayerBarButton}>
              <Image
                source={images.CONTROL_SHUFFLE_WHITE}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.fullPlayerBarButtonLikes}>
              <Image
                source={images.CONTROL_HEART_GRADIENT}
                resizeMode="contain"
                style={{ width: 16, height: 15 }}
              />
              <Text style={styles.fullPlayerBarLikesText} numberOfLines={1}>
                23 000
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fullPlayerBarButton}>
              <Image
                source={images.CONTROL_PLAYLIST_WHITE}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.fullPlayerBarButton}>
              <Image source={images.CONTROL_DOTS_WHITE} resizeMode="contain" />
            </TouchableOpacity>
          </View>
        </View>

        <Animated.View style={minPlayerBottomWhiteSpace} />
        <Animated.View style={minPlayerContainer}>
          <MinPlayer
            onPressPlay={this._onPressPlayPause}
            onPressShowFullPlayer={this._showFullScreenPlayer}
            musicTitle={this.state.musicTitle}
            musicDescription={this.state.musicDescription}
            onRewindStart={this._onMinPlayerRewindStart}
            onRewindEnd={this._onMinPlayerRewindEnd}
            isPlayed={this.state.isPlayed}
            ref={this.minPlayerRef}
          />
        </Animated.View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    overflow: 'hidden',
    width: '100%',
    backgroundColor: colors.TRANSPARENT,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    ...Platform.select({
      ios: {
        ...ifIphoneX(
          {
            paddingTop: getStatusBarHeight() + 24,
          },
          {
            paddingTop: 24,
          },
        ),
      },
      android: {
        paddingTop: 16,
      },
    }),
  },
  navbarCenterSpace: {
    flex: 1,
    backgroundColor: colors.FUCKING_ANDROID,
    ...Platform.select({
      ios: {
        ...ifIphoneX(
          {
            marginTop: -(getStatusBarHeight() + 24),
          },
          {
            marginTop: -24,
          },
        ),
      },
      android: {
        marginTop: -16,
      },
    }),
  },
  fullPlayerContainer: {
    backgroundColor: colors.BLACK_30,
    position: 'absolute',
    left: 0,
    top: 0,
    width: sizes.WINDOW_WIDTH,
    height: sizes.WINDOW_HEIGHT,
    justifyContent: 'space-between',
  },
  fullPlayerMusicText: {
    padding: 16,
    paddingTop: 32,
    backgroundColor: colors.FUCKING_ANDROID,
  },
  fullPlayerTitle: {
    ...style.text.bold,
    fontSize: 24,
    lineHeight: 30,
    color: colors.WHITE,
  },
  fullPlayerArtist: {
    ...style.text.regular,
    fontSize: 16,
    lineHeight: 18,
    color: colors.WHITE,
  },
  fullPlayerCenterSpace: {
    flex: 1,
    backgroundColor: colors.FUCKING_ANDROID,
  },
  fullPlayerTimelineContainer: {
    width: '100%',
    height:
      sizes.FULL_PLAYER_TIMELINE_TOP_HEIGHT +
      sizes.FULL_PLAYER_TIMELINE_BOTTOM_HEIGHT +
      16,
    backgroundColor: colors.FUCKING_ANDROID,
  },
  fullPlayerBottomBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  fullPlayerBarButton: {
    width: 40,
    height: 40,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullPlayerBarButtonLikes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 40,
    padding: 8,
  },
  fullPlayerBarLikesText: {
    ...style.text.regular,
    fontSize: 12,
    lineHeight: 14,
    color: colors.WHITE,
    paddingLeft: 4,
    paddingTop: 2,
  },
  minPlayerContainer: {
    overflow: 'hidden',
    position: 'absolute',
    width: '100%',
    top: 0,
    backgroundColor: colors.WHITE,
    // borderBottomWidth: 1,
    // borderBottomColor: colors.BOTTOM_TABBAR_BORDER,
  },
  minPlayerBottomWhiteSpace: {
    position: 'absolute',
    width: '100%',
    top: sizes.MIN_PLAYER_HEIGHT,
    backgroundColor: colors.WHITE,
  },
})

Player.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  wrapperStyle: ViewPropTypes.style,
  scroll: PropTypes.bool,
  isFetching: PropTypes.bool,
}

Player.defaultProps = {
  scroll: false,
  isFetching: false,
}

export default Player
