import React, { useCallback, useMemo } from 'react'
import TrackPlayer from 'react-native-track-player'
// @ts-ignore больные ублюдки
import { useTrackPlayerProgress } from 'react-native-track-player/lib/hooks'
import { StyledSlider, TextBase } from 'src/components'
import { addSeconds, format } from 'date-fns'
import styled from 'src/styled-components'

const Wrapper = styled.View``

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

  const textProgress = useMemo(() => formatDuration(position), [position])
  const textDuration = useMemo(() => formatDuration(duration), [duration])

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
