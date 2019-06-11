import R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native'
import { connect } from 'react-redux'
import SortableListView from 'react-native-sortable-listview'
import NavBar from '../components/NavBar'
import {
  NAV_BAR_BUTTON_SHEVRON_DOWN_WHITE,
  NAV_BAR_BUTTON_NOTIFICATIONS_WHITE,
  NAV_BAR_BUTTON_USER_AVATAR,
} from '../components/NavBarButton'
import TrackItem from '../components/TrackItem'
import Button from '../components/Button'
import VerticalGestureScreen from './VerticalGestureScreen'
import { tempMusicSelectors } from '../redux/tempMusic'
import { colors, sizes, images } from '../constants'

const DRAGGABLE_AREA_WIDTH = 40
const DRAGGABLE_AREA_RIGHT_OFFSET = 16

class PlayerTracks extends VerticalGestureScreen {
  static propTypes = {
    albums: PropTypes.array,
    onWillUnmount: PropTypes.func,
  }

  static defaultProps = {
    albums: [],
  }

  constructor(props) {
    super(props)
    this.state = {
      data: props.albums[0].tracks,
    }
  }

  componentWillUnmount() {
    const { onWillUnmount } = this.props
    onWillUnmount && onWillUnmount()
    super.componentWillUnmount()
  }

  _renderItem = item => {
    const { albums } = this.props
    const album = albums[0]
    return (
      <TouchableOpacity
        style={styles.rowContainer}
        activeOpacity={0.8}
        delayLongPress={10}
        {...item.sortHandlers}
      >
        <TrackItem
          onPress={() => {}}
          style={styles.trackWrapper}
          blackMode
          label={item.title}
          description={album.artist}
          image={album.artwork}
          controls={
            <View style={styles.itemControls}>
              <Button
                type={Button.types.BUTTON_ICON}
                icon={images.CONTROL_DOTS_WHITE}
                styleWrapper={styles.buttonDotsWrapper}
                onPress={() => {}}
              />
              <Button
                type={Button.types.BUTTON_ICON}
                icon={images.CONTROL_LINES_WHITE}
                styleWrapper={styles.buttonLinesWrapper}
              />
            </View>
          }
        />
      </TouchableOpacity>
    )
  }

  _onRowMoved = ({ from, to }) => {
    const { data: prevData } = this.state
    const data = [].concat(
      from > 0 ? prevData.slice(0, from) : [],
      from < prevData.length ? prevData.slice(from + 1) : [],
    )
    data.splice(to, 0, prevData[from])
    this.setState({
      data,
    })
  }

  render() {
    const { data } = this.state
    const screenContainer = [
      styles.wrapper,
      {
        transform: [{ translateY: this.screenTranslateYAnimation }],
      },
    ]

    return (
      <Animated.View style={screenContainer}>
        <View style={styles.content}>
          <NavBar
            leftButtons={[
              {
                type: NAV_BAR_BUTTON_SHEVRON_DOWN_WHITE,
                onPress: this._hideScreen,
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

          <SortableListView
            style={styles.trackList}
            data={data}
            onRowMoved={this._onRowMoved}
            sortRowStyle={styles.draggableRow}
            renderRow={this._renderItem}
          />
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    overflow: 'hidden',
    width: '100%',
    height: sizes.WINDOW_HEIGHT,
    bottom: 0,
    backgroundColor: colors.BLACK,
  },
  content: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: sizes.WINDOW_WIDTH,
    height: sizes.WINDOW_HEIGHT,
  },
  trackList: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  rowContainer: {
    width: DRAGGABLE_AREA_WIDTH + DRAGGABLE_AREA_RIGHT_OFFSET,
    marginLeft:
      sizes.WINDOW_WIDTH - DRAGGABLE_AREA_WIDTH - DRAGGABLE_AREA_RIGHT_OFFSET,
  },
  draggableRow: {
    opacity: 0.8,
    backgroundColor: colors.WHITE_40,
  },
  trackWrapper: {
    width: sizes.WINDOW_WIDTH,
    left:
      -sizes.WINDOW_WIDTH + DRAGGABLE_AREA_WIDTH + DRAGGABLE_AREA_RIGHT_OFFSET,
  },
  itemControls: {
    flexDirection: 'row',
  },
  buttonDotsWrapper: {
    width: 32,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLinesWrapper: {
    width: DRAGGABLE_AREA_WIDTH,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const mapStateToProps = R.applySpec({
  albums: tempMusicSelectors.getAlbums,
})

const mapDispatchToProps = null

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayerTracks)
