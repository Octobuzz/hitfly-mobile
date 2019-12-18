import L from 'lodash'
import React, { useCallback, useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import TrackPlayer from 'react-native-track-player'
// @ts-ignore больные ублюдки
import { useTrackPlayerProgress } from 'react-native-track-player/lib/hooks'
import { ActiveTrackData, GET_ACTIVE_TRACK } from 'src/apollo'
import { StyledSlider, TextBase } from 'src/components'
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

const formatDuration = (
  initialSeconds: number,
  forceAddHours?: boolean,
): [string, boolean] => {
  const result: string[] = []
  const hours = Math.trunc(initialSeconds / 3600)

  let hoursAdded = false
  if (hours > 0) {
    hoursAdded = true
    const paddedHours = `${hours < 10 ? '0' : ''}${hours}`
    result.push(paddedHours)
  } else if (forceAddHours) {
    result.push('00')
  }

  const minutes = Math.trunc((initialSeconds % 3600) / 60)
  const paddedMinutes = `${minutes < 10 ? '0' : ''}${minutes}`
  result.push(paddedMinutes)

  const seconds = Math.trunc(initialSeconds % 60)
  const paddedSeconds = `${seconds < 10 ? '0' : ''}${seconds}`
  result.push(paddedSeconds)

  return [result.join(':'), hoursAdded]
}

interface Props {}

const PlayerSlider: React.FC<Props> = () => {
  const { duration = 1, position = 0 } = useTrackPlayerProgress()

  const onSlideEnd = useCallback(progress => {
    TrackPlayer.seekTo(progress)
  }, [])

  const data = useQuery<ActiveTrackData>(GET_ACTIVE_TRACK)

  const activeTrack = L.get(data, 'data.activeTrack')

  const recentDuration = (activeTrack && activeTrack.length) || duration

  const [textDuration, hoursAdded] = useMemo(
    () => formatDuration(recentDuration),
    [duration, recentDuration],
  )

  // тут есть баг, из-за которого иногда прогресс больше всей длинны
  const textProgress = useMemo(
    () => formatDuration(Math.min(position, recentDuration), hoursAdded),
    [position, recentDuration],
  )

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
