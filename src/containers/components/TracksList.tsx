import React from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel'
import { Track, NullableTrack } from 'src/apollo'
import { TrackMenu, SlidingPanel, PlaylistTrack } from 'src/components'
import styled from 'src/styled-components'

interface Props {
  tracks: Track[]
}

interface State {
  detailedTrack: NullableTrack
  activeTrack: NullableTrack
}

const Scroll = styled(FlatList as new () => FlatList<Track>).attrs(() => ({
  initialNumToRender: 10,
}))``

class TracksList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    // нужно для вычисления правильной высоты SlidingPanel
    const detailedTrack = props.tracks[0] || null
    this.state = {
      detailedTrack,
      activeTrack: null,
    }
  }

  componentDidMount() {
    this.initActiveTrack()
  }

  private initActiveTrack = (): void => {
    // TODO: когда будет готов плеер, сделать запрос на выбор текущего играемого трека
    // и записать его в activeTrack
    const activeTrack = null
    this.setState({ activeTrack })
  }

  private toggleTrack = (track: Track) => {
    const { activeTrack } = this.state
    let newTrack: NullableTrack
    if (activeTrack) {
      if (activeTrack.id !== track.id) {
        // TODO: поменять трек в глобальном плеере
        newTrack = track
      } else {
        // TODO: пауза в глобальном плеере
        newTrack = null
      }
    } else {
      // TODO: новый трек в глобальном плеере
      newTrack = track
    }
    this.setState({ activeTrack: newTrack })
  }

  private keyExtractor = (item: Track): string => item.id.toString()

  private renderTrack: ListRenderItem<Track> = ({ item, index }) => {
    const isPlaying = this.isTrackPlaying(item)
    return (
      <PlaylistTrack
        index={index}
        isPlaying={isPlaying}
        onPress={this.toggleTrack}
        onPressMore={this.handlePressMore}
        track={item}
      />
    )
  }

  private isTrackPlaying = (track: Track): boolean => {
    const { activeTrack } = this.state
    if (!activeTrack) {
      return false
    }
    return activeTrack.id === track.id
  }

  private handlePressMore = (track: Track): void => {
    this.setState({ detailedTrack: track }, () => {
      if (this.panel) {
        this.panel.show()
      }
    })
  }

  private getItemLayout = (
    _: any,
    index: number,
  ): { length: number; offset: number; index: number } => {
    const length = PlaylistTrack.size
    return {
      length,
      offset: length * index,
      index,
    }
  }

  private panel?: SlidingUpPanel
  private setPanelRef = (ref: SlidingUpPanel): void => {
    this.panel = ref
  }
  private hidePanel = (): void => {
    if (this.panel) {
      this.panel.hide()
    }
  }

  render() {
    const { tracks } = this.props
    const { detailedTrack } = this.state
    return (
      <Scroll
        data={tracks}
        getItemLayout={this.getItemLayout}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderTrack}
      >
        {detailedTrack && (
          <SlidingPanel forwardRef={this.setPanelRef}>
            <TrackMenu onPressCancel={this.hidePanel} track={detailedTrack} />
          </SlidingPanel>
        )}
      </Scroll>
    )
  }
}

export default TracksList
