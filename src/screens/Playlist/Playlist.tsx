import React from 'react'
import { Track, NullableTrack } from 'src/apollo'
import { DarkenImage, SourceType, View, TracksFlatList } from 'src/components'
import { ToggleTrackProps, DetailedTrackMenuProps } from 'src/HOCs'
import ControlButton from './ControlButton'
import ShuffleButton from './ShuffleButton'
import PlaylistInfoPanel from './PlaylistInfoPanel'
import styled from 'src/styled-components'

const CoverWrapper = styled.View`
  height: 45%;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
`

const Cover = styled(DarkenImage)`
  border-bottom-left-radius: 28px;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
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

interface Props extends ToggleTrackProps, DetailedTrackMenuProps {
  cover: SourceType
  tracks: Track[]
  favouritesCount: number
  playlistKey: string
  onRefresh: () => void
  onEndReached: () => void
  isRefreshing: boolean
  isFetchingMore: boolean
}

interface State {
  playingTrack: NullableTrack
}

class Playlist extends React.Component<Props, State> {
  state: State = {
    playingTrack: null,
  }

  // играемый трек может меняться, поэтому надо каждый раз проверять
  // что бы правильно отображать паузу на текущем экране
  static getDerivedStateFromProps = ({
    activeTrack,
    tracks,
  }: Props): Partial<State> | null => {
    if (activeTrack) {
      const playingTrack = tracks.find(({ id }) => activeTrack.id === id)
      return {
        playingTrack,
      }
    } else {
      return {
        playingTrack: null,
      }
    }
  }

  // выбор между обложкой трека или плейлиста
  private getCover = (): SourceType => {
    const { cover } = this.props
    const { playingTrack } = this.state
    if (playingTrack) {
      return { uri: playingTrack.cover[0].imageUrl }
    }
    return cover
  }

  private pauseOrPlayFirstTrack = (): void => {
    const { tracks, toggleTrack, playlistKey } = this.props
    const { playingTrack } = this.state
    if (playingTrack) {
      toggleTrack({ track: playingTrack, playlist: tracks, playlistKey })
    } else {
      toggleTrack({ track: tracks[0], playlist: tracks, playlistKey })
    }
  }

  render() {
    const { tracks, favouritesCount, ...rest } = this.props
    const { playingTrack } = this.state
    const activeCover = this.getCover()
    return (
      <View noPadding>
        <CoverWrapper>
          <Cover source={activeCover} />
          {!!tracks.length && (
            <PositionedControlButton
              onPress={this.pauseOrPlayFirstTrack}
              isPlaying={!!playingTrack && rest.isPlaying}
            />
          )}
          <PositionedShuffleButton />
        </CoverWrapper>
        <PlaylistInfoPanel
          favouritesCount={favouritesCount}
          playlist={tracks}
        />
        <TracksFlatList {...rest} tracks={tracks} />
      </View>
    )
  }
}

export default Playlist
