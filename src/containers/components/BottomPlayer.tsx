import React, { useCallback } from 'react'
// @ts-ignore больные ублюдки
import { useTrackPlayerProgress } from 'react-native-track-player/lib/hooks'
import { BottomPlayer } from 'src/components'
import { withTrackToggle, ToggleTrackProps } from 'src/HOCs'

interface Props extends ToggleTrackProps {}

const BottomPlayerContainer: React.FC<Props> = ({
  activeTrack,
  toggleTrack,
}) => {
  const { duration, progress } = useTrackPlayerProgress()

  const handleToggleTrack = useCallback(() => {}, [])

  const onPressMore = useCallback(() => {
    // TODO: навигация в модалку плеера
  }, [])

  return (
    <BottomPlayer
      toggleTrack={handleToggleTrack}
      onPressMore={onPressMore}
      progress={progress}
      duration={duration}
      track={activeTrack}
    />
  )
}

export default withTrackToggle(BottomPlayerContainer)
