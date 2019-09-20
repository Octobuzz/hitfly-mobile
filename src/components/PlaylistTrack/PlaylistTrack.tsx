import React from 'react'
import { Track } from 'src/apollo'
import { Playable } from './interfaces'
import More from 'src/components/buttons/More'
import TextBase from 'src/components/TextBase'
import TrackImage from './TrackImage'
import { helpers } from 'src/utils'
import styled from 'src/styled-components'

const VERTICAL_PADDING = 16

const Wrapper = styled.TouchableOpacity<Playable>`
  flex-direction: row;
  align-items: center;
  padding: 12px ${VERTICAL_PADDING}px;
  background-color: ${({ theme, isPlaying }) =>
    isPlaying ? theme.colors.gray : theme.colors.white};
`

// width: 24 - для 3-х значных чисел нормально
const TrackNumberText = styled(TextBase)`
  font-size: 12px;
  margin-right: 12px;
  width: 24px;
  text-align: center;
`

const CenterBlock = styled.View`
  flex: 1;
  margin-horizontal: 16px;
`

const BlackText = styled(TextBase)`
  font-size: 12px;
  line-height: 14px;
  font-family: ${({ theme }) => theme.fonts.bold};
`

const GrayText = styled(TextBase)`
  font-size: 10px;
  line-height: 12px;
  color: ${({ theme }) => theme.colors.textAlt};
`

const TimeText = styled(GrayText)`
  margin-left: 16px;
`

interface PlaylistTrackProps extends Playable {
  onPress?: (track: Track) => void
  onPressMore?: (track: Track) => void
  track: Track
  index: number
}

interface Sized {
  size: number
}

export const PlaylistTrack: React.FC<PlaylistTrackProps> & Sized = ({
  index,
  track,
  onPress,
  isPlaying,
  onPressMore,
}) => {
  const { cover, title, group, singer, length } = track
  const trackLength = React.useMemo(() => {
    if (typeof length === 'number') {
      return helpers.formatTimeDurationForTrack(length)
    }
    return '0:00'
  }, [length])

  const handlePressTrack = React.useCallback(() => {
    if (onPress) {
      onPress(track)
    }
  }, [onPress, track])

  const handlePressMore = React.useCallback(() => {
    if (onPressMore) {
      onPressMore(track)
    }
  }, [onPressMore, track])

  return (
    <Wrapper isPlaying={isPlaying} onPress={handlePressTrack}>
      <TrackNumberText>{index}</TrackNumberText>
      <TrackImage isPlaying={isPlaying} imageUrl={cover[0].imageUrl} />
      <CenterBlock>
        <BlackText numberOfLines={1}>{title}</BlackText>
        <GrayText numberOfLines={1}>{group ? group.title : singer}</GrayText>
      </CenterBlock>
      <More onPress={handlePressMore} />
      <TimeText>{trackLength}</TimeText>
    </Wrapper>
  )
}

PlaylistTrack.size = VERTICAL_PADDING + TrackImage.size

export default PlaylistTrack
