import React, { useCallback } from 'react'
import TrackPlayer from 'react-native-track-player'
// @ts-ignore больные ублюдки
import { useTrackPlayerProgress } from 'react-native-track-player/lib/hooks'
import { StyledSlider } from 'src/components'

interface Props {}

const PlayerSlider: React.FC<Props> = () => {
  const { duration = 1, position = 0 } = useTrackPlayerProgress()

  const onSlideEnd = useCallback(progress => {
    TrackPlayer.seekTo(progress)
  }, [])

  return (
    <StyledSlider
      onSlidingComplete={onSlideEnd}
      value={position}
      maximumValue={duration}
    />
  )
}

export default PlayerSlider
