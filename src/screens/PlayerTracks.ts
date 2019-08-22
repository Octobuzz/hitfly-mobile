import R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native'
import { connect } from 'react-redux'
import SortableListView from 'react-native-sortable-listview'
import TrackItem from '../components/TrackItem'
import Button from '../components/Button'
import VerticalGestureScreen from './VerticalGestureScreen'
import { playerSelectors, moveTrackInQueue } from '../redux/player'
import { colors, sizes, names, images } from '../constants'

const DRAGGABLE_AREA_WIDTH = 40
const DRAGGABLE_AREA_RIGHT_OFFSET = 16

class PlayerTracks extends VerticalGestureScreen {
  static propTypes = {
    moveTrackInQueue: PropTypes.func.isRequired,
    queue: PropTypes.array,
    onWillUnmount: PropTypes.func,
  }

  static defaultProps = {
    queue: [],
  }

  constructor(props) {
    super(props)
    this.state = {
      screenQueue: props.queue,
    }
  }

  componentDidUpdate(prevProps) {
    const { queue: prevQueue } = prevProps
    const { queue } = this.props
    // TODO: если плееру не удастся обновить очередь может вернутся такая же
    if (!R.equals(queue, prevQueue)) {
      this.setState({ screenQueue: queue })
    }
  }

  componentWillUnmount() {
    const { onWillUnmount } = this.props
    onWillUnmount && onWillUnmount()
    super.componentWillUnmount()
  }

  _renderItem = ({ id, title, artist, artwork, sortHandlers }) => {
    const { playingTrackId, playerState } = this.props
    const isPlayed =
      playerState === names.PLAYER_STATES.PLAYING ||
      playerState === names.PLAYER_STATES.BUFERING
    return (
      <TouchableOpacity
        style={styles.rowContainer}
        activeOpacity={0.8}
        delayLongPress={10}
        {...sortHandlers}
      >
        <TrackItem
          onPress={() => {}}
          isPlayed={id === playingTrackId && isPlayed}
          isPaused={id === playingTrackId && !isPlayed}
          style={styles.trackWrapper}
          blackMode
          label={title}
          description={artist}
          image={artwork}
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
    const { screenQueue: prevData } = this.state
    const data = [].concat(
      from > 0 ? prevData.slice(0, from) : [],
      from < prevData.length ? prevData.slice(from + 1) : [],
    )
    data.splice(to, 0, prevData[from])
    this.setState(
      {
        screenQueue: data,
      },
      () => {
        this.props.moveTrackInQueue({ from, to })
      },
    )
  }

  render() {
    const { screenQueue } = this.state
    const screenContainer = [
      styles.wrapper,
      {
        transform: [{ translateY: this.screenTranslateYAnimation }],
      },
    ]

    return (
      <Animated.View style={screenContainer}>
        <View style={styles.content}>
          <SortableListView
            contentContainerStyle={styles.trackList}
            data={screenQueue}
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
  queue: playerSelectors.getQueue,
  playingTrackId: playerSelectors.getCurrentTrackId,
  playerState: playerSelectors.getPlayerState,
})

const mapDispatchToProps = {
  moveTrackInQueue,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayerTracks)
