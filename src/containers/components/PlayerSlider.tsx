import L from 'lodash'
import React, { useCallback, useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import TrackPlayer from 'react-native-track-player'
// @ts-ignore больные ублюдки
import { useTrackPlayerProgress } from 'react-native-track-player/lib/hooks'
import { ActiveTrackData, GET_ACTIVE_TRACK } from 'src/apollo'
import { StyledSlider, TextBase } from 'src/components'
import { addSeconds, format } from 'date-fns'
import styled from 'src/styled-components'

const Wrapper = styled.View.attrs(() => ({
  pointerEvents: 'box-none',
}))``

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 4px;
`

const TimeText = styled(TextBase)`
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.white};
`

interface Props {}

const formatDuration = (seconds: number): string => {
  const helperDate = addSeconds(new Date(0), seconds)
  return format(helperDate, 'mm:ss')
}

const PlayerSlider: React.FC<Props> = () => {
  const { duration = 1, position = 0 } = useTrackPlayerProgress()

  const onSlideEnd = useCallback(progress => {
    TrackPlayer.seekTo(progress)
  }, [])

  const data = useQuery<ActiveTrackData>(GET_ACTIVE_TRACK)

  const activeTrack = L.get(data, 'data.activeTrack')

  const recentDuration = (activeTrack && activeTrack.length) || duration

  // тут есть баг, из-за которого иногда прогресс больше всей длинны
  const textProgress = useMemo(
    () =>
      position < recentDuration
        ? formatDuration(position)
        : formatDuration(recentDuration),
    [position, recentDuration],
  )
  const textDuration = useMemo(() => formatDuration(recentDuration), [
    duration,
    recentDuration,
  ])

  return (
    <Wrapper>
      <Row>
        <TimeText>{textProgress}</TimeText>
        <TimeText>{textDuration}</TimeText>
      </Row>
      <StyledSlider
        onSlidingComplete={onSlideEnd}
        value={position}
        maximumValue={duration}
      />
    </Wrapper>
  )
}

export default PlayerSlider
