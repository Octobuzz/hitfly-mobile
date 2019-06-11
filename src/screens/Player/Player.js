import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Animated,
  BackHandler,
} from 'react-native'
import PlayerPanResponder from './PlayerPanResponder'
import {
  NAV_BAR_BUTTON_SHEVRON_DOWN_WHITE,
  NAV_BAR_BUTTON_NOTIFICATIONS_WHITE,
  NAV_BAR_BUTTON_USER_AVATAR,
} from '../../components/NavBarButton'
import NavBar from '../../components/NavBar'
import {
  MinPlayer,
  FullPlayerArtwork,
  FullPlayerTimeLine,
  FullPlayerTimePin,
} from '../../components/Player'
import { colors, sizes, style, images } from '../../constants'
import { generateUID } from '../../utils/helpers'
import { Navigator, screens } from '../../navigation'

class Player extends PlayerPanResponder {
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
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this._onAndroidBackPress,
    )
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

  componentWillUnmount() {
    this.backHandler.remove()
  }

  _onAndroidBackPress = () => {
    if (this.isFullScreen) {
      this._showMinPlayer()
      return true
    }
  }

  _onPressShowMinPlayer = () => this._showMinPlayer()
  _onPressShowFullPlayer = () => this._showFullScreenPlayer()

  _onPressShowPlayerTracks = () => {
    if (!this.isPlayerTracksOpened) {
      this.isPlayerTracksOpened = true
      this.playerTracksScreenId = generateUID()
      Navigator.showOverlay(screens.PLAYER_TRACKS, this.playerTracksScreenId, {
        onWillUnmount: () => {
          this.isPlayerTracksOpened = false
        },
      })
    }
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
          <NavBar
            leftButtons={[
              {
                type: NAV_BAR_BUTTON_SHEVRON_DOWN_WHITE,
                onPress: this._onPressShowMinPlayer,
              },
            ]}
            rightButtons={[
              {
                type: NAV_BAR_BUTTON_NOTIFICATIONS_WHITE,
              },
              {
                type: NAV_BAR_BUTTON_USER_AVATAR,
              },
            ]}
            centerSpaceProps={this._panResponder.panHandlers}
          />
          <View
            style={styles.fullPlayerMusicText}
            {...this._panResponder.panHandlers}
          >
            <Text style={styles.fullPlayerTitle}>{this.state.musicTitle}</Text>
            <Text style={styles.fullPlayerArtist}>
              {this.state.musicDescription}
            </Text>
          </View>
          <View
            style={styles.fullPlayerCenterSpace}
            {...this._panResponder.panHandlers}
          />
          <View
            style={styles.fullPlayerTimelineContainer}
            {...this._panResponder.panHandlers}
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
            <TouchableOpacity
              style={styles.fullPlayerBarButton}
              onPress={this._onPressShowPlayerTracks}
            >
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
            onPressShowFullPlayer={this._onPressShowFullPlayer}
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

export default Player
