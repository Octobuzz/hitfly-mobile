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
} from 'react-native'
import RNLinearGradient from 'react-native-linear-gradient'
import {
  LongPressGestureHandler,
  PanGestureHandler,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler'
import NavBarButton, {
  NAV_BAR_BUTTON_SHEVRON_DOWN_WHITE,
  NAV_BAR_BUTTON_USER_AVATAR,
} from './NavBarButton'
import FullPlayerArtwork from '../components/FullPlayerArtwork'
import FullPlayerTimeLine from '../components/FullPlayerTimeLine'
import FullPlayerTimePin from '../components/FullPlayerTimePin'
import { colors, sizes, style, images } from '../constants'
import { Navigator } from '../navigation'

class Player extends Component {
  constructor() {
    super()
    this.state = {
      bottomTabsHeight: 0,
      isPlayed: false,
      isRewinded: false,
      timelinePosition: sizes.WINDOW_WIDTH * 0.3,
      fullPlayerCurrentTime: 12.6,
      fullPlayerTotalTime: 107.189,
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
    this.panState = {
      changesCount: 0,
      fullPlayerInitialTime: 0,
    }
    this.screenHeight = new Animated.Value(0)
    this.screenBottom = new Animated.Value(0)
    this.minPlayerTop = new Animated.Value(-sizes.MIN_PLAYER_HEIGHT)
    this.minPlayerOpacity = new Animated.Value(1)
    this.minTimelineTranslateX = new Animated.Value(0)
    this.minTimelineTranslateX_value = 0

    this.timelinePanRef = React.createRef()
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
            () => this._initBottomPlayerAnimate(),
          )
        })
        .catch(e => {
          // console.log('error: ', e)
        })
    }, 500)
  }

  _onTimeLinePressEvent = ({ nativeEvent: { x } }) => {
    const roundX = Math.round(x)
    if (this.minTimelineTranslateX_value !== roundX) {
      this.minTimelineTranslateX_value = roundX
      Animated.timing(this.minTimelineTranslateX, {
        toValue: roundX,
        duration: 0,
        useNativeDriver: true,
      }).start()
    }
  }

  _onTimeLinePressStateChange = ({ nativeEvent: { oldState, x } }) => {
    if (!oldState) {
      // console.log('timeline [StartPress]')
    } else {
      // console.log('timeline [EndPress] ', x)
    }
  }

  _onPanPressEvent = ({ nativeEvent: { translationX } }) => {
    // console.log('nativeEvent: ', nativeEvent)
    // console.log('translationX: ', translationX)
    let fullPlayerCurrentTime =
      this.panState.fullPlayerInitialTime - translationX
    if (fullPlayerCurrentTime >= this.state.fullPlayerTotalTime) {
      fullPlayerCurrentTime = this.state.fullPlayerTotalTime
    } else if (fullPlayerCurrentTime <= 0) {
      fullPlayerCurrentTime = 0
    }
    this.setState({
      fullPlayerCurrentTime,
    })
  }

  _onPanStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.BEGAN) {
      // console.log('timeline [BEGAN Press]')
      this.panState = {
        ...this.panState,
        fullPlayerInitialTime: this.state.fullPlayerCurrentTime,
      }
    } else if (nativeEvent.state === State.ACTIVE) {
      // console.log('timeline [ACTIVE]')
      this.setState({
        isRewinded: true,
      })
    } else if (
      nativeEvent.state === State.END ||
      nativeEvent.state === State.CANCELLED
    ) {
      // console.log('timeline [END Press] ')
      this.setState({
        isRewinded: false,
      })
    } else if (nativeEvent.state === State.FAILED) {
      // console.log('timeline [FAILED]')
    } else if (nativeEvent.state === State.UNDETERMINED) {
      // console.log('timeline [UNDETERMINED]')
    }
  }

  _onTapStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      this._onPressPlay()
    }
  }

  _onPressPlay = () => {
    this.setState({
      isPlayed: !this.state.isPlayed,
    })
  }

  _initBottomPlayerAnimate = () => {
    Animated.sequence([
      Animated.timing(this.screenBottom, {
        toValue: this.state.bottomTabsHeight,
        duration: 0,
      }),
      Animated.timing(this.screenHeight, {
        toValue: sizes.MIN_PLAYER_HEIGHT,
        delay: 1000,
        duration: 400,
        easing: Easing.bezier(0.5, 0, 0.5, 1),
      }),
    ]).start()
  }

  _showFullScreenPlayer = () => {
    Animated.parallel([
      Animated.timing(this.screenBottom, {
        toValue: 0,
        delay: 100,
        duration: 100,
        easing: Easing.bezier(0.5, 0, 0.5, 1),
      }),
      Animated.timing(this.minPlayerOpacity, {
        toValue: 0,
        duration: 100,
      }),
      Animated.timing(this.screenHeight, {
        toValue: sizes.WINDOW_HEIGHT,
        duration: 400,
        easing: Easing.bezier(0.5, 0, 0.5, 1),
      }),
    ]).start()
  }

  _hideFullScreenPlayer = () => {
    Animated.parallel([
      Animated.timing(this.screenBottom, {
        toValue: this.state.bottomTabsHeight,
        duration: 100,
        delay: 200,
        easing: Easing.bezier(0.5, 0, 0.5, 1),
      }),
      Animated.timing(this.screenHeight, {
        toValue: sizes.MIN_PLAYER_HEIGHT,
        duration: 400,
        easing: Easing.bezier(0.5, 0, 0.5, 1),
      }),
      Animated.timing(this.minPlayerOpacity, {
        toValue: 1,
        delay: 300,
        duration: 100,
      }),
    ]).start()
  }

  render() {
    const { bottomTabsHeight, isPlayed, isRewinded } = this.state
    const screenContainer = [
      styles.wrapper,
      {
        height: this.screenHeight,
        bottom: this.screenBottom,
        backgroundColor: this.screenHeight.interpolate({
          inputRange: [0, sizes.MIN_PLAYER_HEIGHT, sizes.WINDOW_HEIGHT],
          outputRange: [colors.TRANSPARENT, colors.WHITE, colors.BLACK],
        }),
      },
      this.props.wrapperStyle,
    ]
    const minPlayerContainer = [
      styles.minPlayerContainer,
      {
        opacity: this.minPlayerOpacity,
        height: this.minPlayerOpacity.interpolate({
          inputRange: [0, 0.01, 1],
          outputRange: [0, sizes.MIN_PLAYER_HEIGHT, sizes.MIN_PLAYER_HEIGHT],
        }),
      },
    ]
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
          currentTime={this.state.fullPlayerCurrentTime}
          totalTime={this.state.fullPlayerTotalTime}
          isBlured={!isPlayed || isRewinded}
        />
        <View style={styles.fullPlayerContainer}>
          <View style={styles.navbar}>
            <NavBarButton
              type={NAV_BAR_BUTTON_SHEVRON_DOWN_WHITE}
              onPress={this._hideFullScreenPlayer}
            />
            <NavBarButton type={NAV_BAR_BUTTON_USER_AVATAR} />
          </View>

          <View style={styles.fullPlayerMusicText}>
            <Text style={styles.fullPlayerTitle}>Killer Queen</Text>
            <Text style={styles.fullPlayerArtist}>Queen</Text>
          </View>

          <PanGestureHandler
            onGestureEvent={this._onPanPressEvent}
            onHandlerStateChange={this._onPanStateChange}
            maxPointers={1}
          >
            <TapGestureHandler
              waitFor={[this.timelinePanRef]}
              onHandlerStateChange={this._onTapStateChange}
            >
              <View style={styles.fullPlayerCenterSpace} />
            </TapGestureHandler>
          </PanGestureHandler>
          <PanGestureHandler
            onGestureEvent={this._onPanPressEvent}
            onHandlerStateChange={this._onPanStateChange}
            maxPointers={1}
            ref={this.timelinePanRef}
          >
            <TapGestureHandler onHandlerStateChange={this._onTapStateChange}>
              <View style={styles.fullPlayerTimelineContainer}>
                <FullPlayerTimeLine
                  levels={this.state.timelineLevels}
                  currentTime={this.state.fullPlayerCurrentTime}
                  totalTime={this.state.fullPlayerTotalTime}
                  isPlayed={isPlayed}
                />
                <FullPlayerTimePin
                  currentTime={this.state.fullPlayerCurrentTime}
                  totalTime={this.state.fullPlayerTotalTime}
                  isRewinded={isRewinded}
                  bottomTabsHeight={bottomTabsHeight}
                />
              </View>
            </TapGestureHandler>
          </PanGestureHandler>
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

        <Animated.View style={minPlayerContainer}>
          <LongPressGestureHandler
            onGestureEvent={this._onTimeLinePressEvent}
            onHandlerStateChange={this._onTimeLinePressStateChange}
            minDurationMs={0}
          >
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
          </LongPressGestureHandler>
          <View style={styles.minPlayerRow}>
            <TouchableOpacity
              style={styles.minPlayerItemInfoRow}
              onPress={this._showFullScreenPlayer}
            >
              <View style={styles.minPlayerArtworkContainer}>
                <View style={styles.minPlayerArtworkShadow}>
                  <Image
                    source={images.TEMP_ARTWORK_MIN}
                    style={styles.minPlayerArtworkImage}
                    resizeMode="contain"
                  />
                </View>
              </View>
              <View style={styles.minPlayerItemInfo}>
                <Text style={styles.minPlayerItemTitle} numberOfLines={1}>
                  Мальчики
                </Text>
                <Text style={styles.minPlayerItemDescription} numberOfLines={1}>
                  АлоэВера – Алимоно – 2018
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.minPlayerPlayButton}
              onPress={this._onPressPlay}
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
    padding: 16,
    paddingTop: 24,
  },

  fullPlayerBgImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: sizes.WINDOW_WIDTH * 3,
    height: sizes.WINDOW_HEIGHT,
  },
  fullPlayerContainer: {
    backgroundColor: colors.BLACK_30,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  fullPlayerMusicText: {
    padding: 16,
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
  },
  fullPlayerTimelineContainer: {
    width: '100%',
    height:
      sizes.FULL_PLAYER_TIMELINE_TOP_HEIGHT +
      sizes.FULL_PLAYER_TIMELINE_BOTTOM_HEIGHT +
      16,
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
