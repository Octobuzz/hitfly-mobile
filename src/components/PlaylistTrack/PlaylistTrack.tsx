import React from 'react'
import { Track } from 'src/apollo'
import { TextBase, More } from 'src/components'
import { Playable } from './interfaces'
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

interface Props extends Playable {
  onPress?: (track: Track) => void
  track: Track
  index: number
}

interface Sized {
  size: number
}

const PlaylistTrack: React.FC<Props> & Sized = ({
  index,
  track,
  onPress,
  isPlaying,
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

  return (
    <Wrapper isPlaying={isPlaying} onPress={handlePressTrack}>
      <TrackNumberText>{index}</TrackNumberText>
      <TrackImage isPlaying={isPlaying} imageUrl={cover[0].imageUrl} />
      <CenterBlock>
        <BlackText numberOfLines={1}>{title}</BlackText>
        <GrayText numberOfLines={1}>{group ? group.title : singer}</GrayText>
      </CenterBlock>
      <More />
      <TimeText>{trackLength}</TimeText>
    </Wrapper>
  )
}

PlaylistTrack.size = VERTICAL_PADDING + TrackImage.size

export default PlaylistTrack
