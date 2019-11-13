import React, { useCallback } from 'react'
// @ts-ignore больные ублюдки
import { useTrackPlayerProgress } from 'react-native-track-player/lib/hooks'
import { BottomPlayer } from 'src/components'
import { withTrackToggle, ToggleTrackProps } from 'src/HOCs'

interface Props extends ToggleTrackProps {}

const BottomPlayerContainer: React.FC<Props> = ({
  activeTrack,
  toggleTrack,
  isPlaying,
}) => {
  const { duration, position } = useTrackPlayerProgress()

  const handlePressControl = useCallback(() => {
    toggleTrack()
  }, [toggleTrack])

  const onPressMore = useCallback(() => {
    // TODO: навигация в модалку плеера
  }, [])

  return (
    <BottomPlayer
      isPlaying={isPlaying}
      onPressControl={handlePressControl}
      onPressMore={onPressMore}
      progress={position}
      duration={duration}
      track={activeTrack}
    />
  )
}

export default withTrackToggle(BottomPlayerContainer)
