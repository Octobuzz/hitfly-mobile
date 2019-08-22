import R from 'ramda'
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
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TrackPlayer from 'react-native-track-player'
import {
  playerSelectors,
  trackPlayerStateChanged,
  trackPlayerTrackChanged,
  initPlayerQueue,
} from '../../redux/player'
import PlayerPanResponder from './PlayerPanResponder'
import {
  MinPlayer,
  FullPlayerArtwork,
  FullPlayerTimeLine,
  FullPlayerTimePin,
  TPProgress,
} from '../../components/Player'
import { colors, sizes, style, images, names } from '../../constants'
import { generateUID } from '../../utils/helpers'
import { Navigator, screens } from '../../navigation'

class Player extends PlayerPanResponder {
  static propTypes = {
    trackPlayerStateChanged: PropTypes.func.isRequired,
    playingAlbumId: PropTypes.number,
    playingTrackId: PropTypes.string,
    playingQueue: PropTypes.array,
    playerState: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      bottomTabsHeight: 50,
      isPlayed: false,
    }
  }

  componentDidMount() {
    super.componentDidMount()
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this._onAndroidBackPress,
    )
    this.props.initPlayerQueue()
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
    // this.fullPlayerTimeLineRef.current.init(
    //   this.currentTime,
    //   this.totalTime,
    //   this.state.timelineLevels,
    //   this.isPlayed,
    // )
    this.fullPlayerTimePinRef.current.setTime(this.currentTime, this.totalTime)
  }

  componentWillUnmount() {
    this.backHandler.remove()
    super.componentWillUnmount()
  }

  onTP_playbackState = ({ state }) => {
    this.props.trackPlayerStateChanged(state)
  }

  onTP_playbackTrackChanged = ({ nextTrack, track }) => {
    this.props.trackPlayerTrackChanged(track || nextTrack)
  }

  _animateSeek = (time, totalTime) => {
    this.minPlayerRef.current.animateToTime(time, totalTime)
    this.fullPlayerArtworkRef.current.animateToTime(time, totalTime, 1200)
    this.fullPlayerTimeLineRef.current.animateToTime(time, totalTime)
    this.fullPlayerTimePinRef.current.setTime(time, totalTime)
  }

  _onTPProgressUpdate = ({ position, bufferedPosition, duration }) => {
    this.totalTime = duration
    if (!this.isRewinded) {
      this._animateSeek(position, duration)
    }
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

  _onPressPlayPause = () => {
    const { playerState } = this.props
    if (
      playerState === names.PLAYER_STATES.PLAYING ||
      playerState === names.PLAYER_STATES.BUFERING
    ) {
      TrackPlayer.pause()
    } else {
      TrackPlayer.play()
    }
  }

  render() {
    const {
      playerState,
      playingTrackInfo: {
        artwork: currentArtwork = '',
        title: currentTitle,
        artist: currentArtist = '',
        levels: currentLevels = [],
        totalTime: currentTotalTime = 0,
      } = {},
    } = this.props
    const isPlayed =
      playerState === names.PLAYER_STATES.PLAYING ||
      playerState === names.PLAYER_STATES.BUFERING
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
          source={currentArtwork}
          // currentTime={this.playerCurrentTime}
          // totalTime={this.playerTotalTime}
          ref={this.fullPlayerArtworkRef}
        />
        <View style={styles.fullPlayerContainer}>
          <View
            style={styles.fullPlayerMusicText}
            {...this._panResponder.panHandlers}
          >
            <Text style={styles.fullPlayerTitle}>{currentTitle}</Text>
            <Text style={styles.fullPlayerArtist}>{currentArtist}</Text>
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
              totalTime={currentTotalTime}
              levels={currentLevels}
              isPlayed={isPlayed}
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
                style={{ width: 16, height: 15 }} // eslint-disable-line react-native/no-inline-styles
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
            title={currentTitle}
            description={currentArtist}
            artwork={currentArtwork}
            onRewindStart={this._onMinPlayerRewindStart}
            onRewindEnd={this._onMinPlayerRewindEnd}
            isPlayed={isPlayed}
            ref={this.minPlayerRef}
          />
        </Animated.View>
        <TPProgress onProgressUpdate={this._onTPProgressUpdate} />
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

const mapStateToProps = R.applySpec({
  playingAlbumId: playerSelectors.getCurrentAlbumId,
  playingTrackId: playerSelectors.getCurrentTrackId,
  playingTrackInfo: playerSelectors.getCurrentTrackInfo,
  playingQueue: playerSelectors.getQueue,
  playerState: playerSelectors.getPlayerState,
})

const mapDispatchToProps = {
  trackPlayerStateChanged,
  trackPlayerTrackChanged,
  initPlayerQueue,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Player)
