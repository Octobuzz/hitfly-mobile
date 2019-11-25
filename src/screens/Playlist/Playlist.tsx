import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { Track, NullableTrack } from 'src/apollo'
import {
  View,
  Loader,
  SourceType,
  DarkenImage,
  TracksFlatList,
} from 'src/components'
import { ToggleTrackProps, DetailedTrackMenuProps } from 'src/HOCs'
import ControlButton from './ControlButton'
import ShuffleButton from './ShuffleButton'
import PlaylistInfoPanel from './PlaylistInfoPanel'
import styled from 'src/styled-components'

const CoverWrapper = styled.View`
  height: 365px;
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

interface Props
  extends ToggleTrackProps,
    DetailedTrackMenuProps,
    NavigationStackScreenProps<{ trackToPlay?: Track }> {
  cover: SourceType
  tracks: Track[]
  favouritesCount: number
  playlistKey: string
  onRefresh: () => void
  onEndReached: () => void
  isLoading: boolean
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

  componentDidMount() {
    const { toggleTrack, navigation, playlistKey, tracks } = this.props
    const trackToPlay = navigation.getParam('trackToPlay')
    if (trackToPlay) {
      toggleTrack({
        track: trackToPlay,
        playlistData: { playlist: tracks, playlistKey },
      })
    }
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

  private handlePressShuffle = (): void => {
    const { shuffle, tracks } = this.props
    shuffle({ playlist: tracks })
  }

  private pauseOrPlayFirstTrack = (): void => {
    const { tracks, toggleTrack, playlistKey } = this.props
    const { playingTrack } = this.state
    const track = playingTrack || tracks[0]
    toggleTrack({ track, playlistData: { playlist: tracks, playlistKey } })
  }

  render() {
    const { tracks, favouritesCount, isLoading, ...rest } = this.props
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
          <PositionedShuffleButton onPress={this.handlePressShuffle} />
        </CoverWrapper>
        {isLoading ? (
          <Loader isFilled />
        ) : (
          <>
            <PlaylistInfoPanel
              favouritesCount={favouritesCount}
              playlist={tracks}
            />
            <TracksFlatList {...rest} tracks={tracks} />
          </>
        )}
      </View>
    )
  }
}

export default Playlist
