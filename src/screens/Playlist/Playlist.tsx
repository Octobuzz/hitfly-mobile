import React from 'react'
import { Track, NullableTrack } from 'src/apollo'
import { Image, SourceType, View } from 'src/components'
import { TracksList } from 'src/containers'
import ControlButton from './ControlButton'
import ShuffleButton from './ShuffleButton'
import PlaylistInfoPanel from './PlaylistInfoPanel'
import styled from 'src/styled-components'

const CoverWrapper = styled.View`
  height: 45%;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
`

const Cover = styled(Image)`
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

interface Props {
  cover: SourceType
  tracks: Track[]
  favouritesCount: number
  playingTrack: NullableTrack
}

interface State {
  activeTrack: Track | null
}

class Playlist extends React.Component<Props, State> {
  state: State = {
    activeTrack: null,
  }

  // играемый трек может менятся, поэтому надо каждый раз проверят
  // что бы правильно отображать паузу на текущем экране
  static getDerivedStateFromProps = ({
    playingTrack,
    tracks,
  }: Props): Partial<State> | null => {
    if (playingTrack && tracks.includes(playingTrack)) {
      return {
        activeTrack: playingTrack,
      }
    }

    return null
  }

  private pausePlayer = (): void => {
    // TODO: пауза в глобальном плеере
  }

  private playTrack = (track: Track): void => {
    // TODO: воспроизведение в глобальном плеере
  }

  // выбор между обложкой трека или плейлиста
  private getCover = (): SourceType => {
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
      this.pausePlayer()
    } else {
      this.playTrack(tracks[0])
    }
  }

  render() {
    const { tracks, favouritesCount } = this.props
    const { activeTrack } = this.state
    const activeCover = this.getCover()
    return (
      <View noPadding addBottomSafePadding>
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
        <TracksList tracks={tracks} />
      </View>
    )
  }
}

export default Playlist
