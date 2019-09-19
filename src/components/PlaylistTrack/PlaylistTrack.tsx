import React from 'react'
import { Track } from 'src/apollo'
import { TextBase, More } from 'src/components'
import { Playable } from './interfaces'
import TrackImage from './TrackImage'
import styled from 'src/styled-components'
import { helpers } from 'src/utils'

const Wrapper = styled.TouchableOpacity<Playable>`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  background-color: ${({ theme, isPlaying }) =>
    isPlaying ? theme.colors.gray : theme.colors.white};
`

const TrackNumberText = styled(TextBase)`
  font-size: 12px;
  margin-right: 12px;
`

const CenterBlock = styled.View`
  flex: 1;
  margin-horizontal: 16px;
`

const BlackText = styled(TextBase)`
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.bold};
`

const GrayText = styled(TextBase)`
  font-size: 10px;
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

const PlaylistTrack: React.FC<Props> = ({
  index,
  isPlaying,
  track: { cover, title, group, singer, length },
}) => {
  const trackLength = React.useMemo(() => {
    if (typeof length === 'number') {
      return helpers.formatTimeDurationForTrack(length)
    }
    return '0:00'
  }, [length])
  return (
    <Wrapper isPlaying={isPlaying}>
      <TrackNumberText>{index}</TrackNumberText>
      <TrackImage isPlaying={isPlaying} imageUrl={cover[0].imageUrl} />
      <CenterBlock>
        <BlackText>{title}</BlackText>
        <GrayText>{group ? group.title : singer}</GrayText>
      </CenterBlock>
      <More />
      <TimeText>{trackLength}</TimeText>
    </Wrapper>
  )
}

export default PlaylistTrack
