import R from 'ramda'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  Platform,
} from 'react-native'
import RNFastImage from 'react-native-fast-image'
import { profileSelectors, requestLogOut } from '../redux/profile'
import { tempMusicSelectors } from '../redux/tempMusic'
import Button from '../components/Button'
import PlaylistItem from '../components/PlaylistItem'
import Wrapper from '../containers/Wrapper'
import { images, colors, style, sizes } from '../constants'
import { getNameForCount, secondsToStringTime } from '../utils/helpers'

const HEADER_MIN_HEIGHT = sizes.NAVBAR_HEIGHT + sizes.BUTTON_HEIGHT
const HEADER_SCROLL_DISTANCE =
  sizes.PARALLAX_HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

class Playlist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playlistInfoHeight: 0,
    }
    this.scrollY = new Animated.Value(0)
  }

  _renderItem = ({ item, index }) => {
    const { albums, albumId } = this.props
    const album = albums[albumId]
    return (
      <PlaylistItem
        title={item.title}
        description={album.artist}
        time={secondsToStringTime(item.time, ':')}
        image={album.artwork}
        controls={
          <Button
            type={Button.types.BUTTON_ICON}
            icon={images.CONTROL_DOTS_BLACK}
            styleWrapper={styles.itemButtonDots}
            styleIconImage={styles.itemButtonDotsImage}
            onPress={() => {}}
          />
        }
      />
    )
  }

  _keyExtractor = (item, index) => {
    return `item_${item.id || index}`
  }

  _renderPlaylistInfo = () => {
    const { albums, albumId } = this.props
    const album = albums[albumId]
    return (
      <View style={styles.playlistInfo} onLayout={this._onPlaylistInfoLayout}>
        <Text style={styles.playlistInfoText} numberOfLines={1}>
          {`${album.tracks.length} ${getNameForCount(album.tracks.length, [
            'песня',
            'песни',
            'песен',
          ])} ${secondsToStringTime(album.totalTime, '', 'playlistInfo')}`}
        </Text>
        <TouchableOpacity style={styles.playlistButtonLikes}>
          <Image source={images.CONTROL_HEART_BLACK} resizeMode="contain" />
          <Text style={styles.playlistLikesCount} numberOfLines={1}>
            23 000
          </Text>
        </TouchableOpacity>
        <Button
          type={Button.types.BUTTON_ICON}
          icon={images.CONTROL_DOTS_BLACK}
          styleWrapper={styles.playlistButtonDots}
          onPress={() => {}}
        />
      </View>
    )
  }

  _onPlaylistInfoLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }) => {
    if (Platform.OS === 'ios' && this.state.playlistInfoHeight !== height) {
      this.setState({
        playlistInfoHeight: height,
      })
    }
  }

  render() {
    const { playlistInfoHeight } = this.state
    const headerContainer = [
      styles.header,
      {
        height: this.scrollY.interpolate({
          inputRange: [0, HEADER_SCROLL_DISTANCE + playlistInfoHeight],
          outputRange: [
            sizes.PARALLAX_HEADER_MAX_HEIGHT,
            sizes.NAVBAR_HEIGHT + sizes.BUTTON_HEIGHT,
          ],
          extrapolate: 'clamp',
        }),
      },
    ]
    const headerPlayContainer = [
      styles.headerPlayContainer,
      {
        opacity: this.scrollY.interpolate({
          inputRange: [0, HEADER_SCROLL_DISTANCE + playlistInfoHeight - 56],
          outputRange: [1, 0],
        }),
        bottom: this.scrollY.interpolate({
          inputRange: [
            0,
            HEADER_SCROLL_DISTANCE + playlistInfoHeight - 56,
            HEADER_SCROLL_DISTANCE + playlistInfoHeight - 54,
          ],
          outputRange: [0, 0, '100%'],
        }),
      },
    ]
    const { albums, albumId } = this.props
    const album = albums[albumId]

    return (
      <Wrapper
        isFetching={this.props.isFetching}
        playerOffset
        style={styles.wrapper}
      >
        <FlatList
          style={styles.flatlist}
          scrollEventThrottle={16}
          contentContainerStyle={styles.playlistContent}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.scrollY } } },
          ])}
          renderItem={this._renderItem}
          data={album.tracks}
          ListHeaderComponent={this._renderPlaylistInfo}
          showsVerticalScrollIndicator={false}
          keyExtractor={this._keyExtractor}
        />
        <Animated.View style={headerContainer}>
          <RNFastImage
            source={{ uri: album.artwork }}
            style={styles.headerArtwork}
            resizeMode="cover"
          />
          <Animated.View style={headerPlayContainer}>
            <TouchableOpacity
              style={styles.headerPlayTouch}
              activeOpacity={0.8}
            >
              <Image source={images.CONTROL_PLAYER_PLAY} resizeMode="contain" />
            </TouchableOpacity>
          </Animated.View>
          <Button
            type={Button.types.BUTTON_HEADER}
            label="Перемешать"
            styleWrapper={styles.headerButtonWrapper}
            onPress={() => {}}
          />
        </Animated.View>
      </Wrapper>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.BLACK,
    overflow: 'hidden',
  },
  headerButtonWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  headerArtwork: {
    flex: 1,
    opacity: 0.7,
  },
  headerPlayContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  headerPlayTouch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playlistInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  playlistInfoText: {
    ...style.text.regular,
    fontSize: 12,
    lineHeight: 14,
    color: colors.GRAY_LABEL,
    flexGrow: 1,
    width: 0,
  },
  playlistButtonLikes: {
    flexDirection: 'row',
  },
  playlistLikesCount: {
    ...style.text.regular,
    fontSize: 12,
    lineHeight: 14,
    color: colors.GRAY_LABEL,
    paddingLeft: 4,
  },
  playlistButtonDots: {
    width: 40,
    height: 40,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  itemButtonDots: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
  },
  itemButtonDotsImage: {
    width: 14,
  },
  flatlist: {
    flex: 1,
  },
  playlistContent: {
    paddingBottom: 8,
    ...Platform.select({
      ios: {
        paddingTop: sizes.PARALLAX_HEADER_MAX_HEIGHT - sizes.NAVBAR_HEIGHT,
      },
      android: {
        paddingTop: sizes.PARALLAX_HEADER_MAX_HEIGHT,
      },
    }),
  },
})

Playlist.propTypes = {
  requestLogOut: PropTypes.func,
  userName: PropTypes.string,
  isFetching: PropTypes.bool,
  albumId: PropTypes.number,
}

const mapStateToProps = R.applySpec({
  userName: profileSelectors.getUserName,
  isFetching: profileSelectors.getIsFetching,
  albums: tempMusicSelectors.getAlbums,
})

const mapDispatchToProps = {
  requestLogOut,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Playlist)
