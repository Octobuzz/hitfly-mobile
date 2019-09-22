import React from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import FastImage, { FastImageSource } from 'react-native-fast-image'
import SlidingUpPanel from 'rn-sliding-up-panel'
import { Track } from 'src/apollo'
import { SlidingPanel, PlaylistTrack } from 'src/components'
import TrackMenu from './TrackMenu'
import ControlButton from './ControlButton'
import ShuffleButton from './ShuffleButton'
import PlaylistInfoPanel from './PlaylistInfoPanel'
import styled from 'src/styled-components'

const CoverWrapper = styled.View`
  height: 45%;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
`

const Cover = styled(FastImage)`
  border-bottom-left-radius: 28px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const PositionedShuffleButton = styled(ShuffleButton)`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 80%;
`

const PositionedControlButton = styled(ControlButton)`
  align-self: center;
`

const Scroll = styled(FlatList as new () => FlatList<Track>).attrs(() => ({
  initialNumToRender: 10,
}))``

type CoverType = FastImageSource | number

interface Props {
  cover: CoverType
  tracks: Track[]
  favouritesCount: number
}

interface State {
  activeTrack: Track | null
  detailedTrack?: Track
}

// TODO: на didMount нужно устанить текущий трек, если он есть в этом плейлисте
// и играет сейчас
class Playlist extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    // нужно для вычисления правильной высоты SlidingPanel
    const detailedTrack = props.tracks[0] || null
    this.state = {
      activeTrack: null,
      detailedTrack,
    }
  }

  private toggleTrack = (track: Track) => {
    const { activeTrack } = this.state
    if (activeTrack) {
      if (activeTrack.id !== track.id) {
        // TODO: поменять трек в глобальном плеере
        this.setState({ activeTrack: track })
      } else {
        this.pauseTrack()
      }
    } else {
      // TODO: новый трек в глобальном плеере
      this.setState({ activeTrack: track })
    }
  }

  private pauseTrack = (): void => {
    // TODO: пауза в глобальном плеере
    this.setState({ activeTrack: null })
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

  private getCover = (): CoverType => {
    const { cover } = this.props
    const { activeTrack } = this.state
    if (activeTrack) {
      return { uri: activeTrack.cover[0].imageUrl }
    }
    return cover
  }

  private pauseOrPlayFirstTrack = (): void => {
    const { tracks } = this.props
    const { activeTrack } = this.state
    if (activeTrack) {
      this.pauseTrack()
    } else {
      this.setState({ activeTrack: tracks[0] })
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
    const { tracks, favouritesCount } = this.props
    const { activeTrack, detailedTrack } = this.state
    const activeCover = this.getCover()
    return (
      <>
        <CoverWrapper>
          <Cover source={activeCover} />
          {!!tracks.length && (
            <PositionedControlButton
              onPress={this.pauseOrPlayFirstTrack}
              isPlaying={!!activeTrack}
            />
          )}
          <PositionedShuffleButton />
        </CoverWrapper>
        <PlaylistInfoPanel
          favouritesCount={favouritesCount}
          playlist={tracks}
        />
        <Scroll
          data={tracks}
          getItemLayout={this.getItemLayout}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderTrack}
        />
        <SlidingPanel forwardRef={this.setPanelRef}>
          <TrackMenu onPressCancel={this.hidePanel} track={detailedTrack} />
        </SlidingPanel>
      </>
    )
  }
}

export default Playlist
