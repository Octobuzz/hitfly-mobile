import React, { useCallback } from 'react'
import TrackPlayer from 'react-native-track-player'
// @ts-ignore больные ублюдки
import { useTrackPlayerProgress } from 'react-native-track-player/lib/hooks'
import { withTrackToggle, ToggleTrackProps } from 'src/HOCs'
import { useNavigation } from 'src/hooks'
import { BottomPlayer } from 'src/components'
import { routes } from 'src/constants'

interface Props extends ToggleTrackProps {}

const BottomPlayerContainer: React.FC<Props> = ({
  activeTrack,
  toggleTrack,
  isPlaying,
}) => {
  const { duration, position } = useTrackPlayerProgress()
  const navigation = useNavigation()

  const handlePressControl = useCallback(() => {
    toggleTrack()
  }, [toggleTrack])

  const onPress = useCallback(() => {
    navigation.navigate(routes.PLAYER.MODAL_PLAYER)
  }, [])
  const onSlideEnd = useCallback(progress => {
    TrackPlayer.seekTo(progress)
  }, [])

  return (
    <BottomPlayer
      onSlideEnd={onSlideEnd}
      isPlaying={isPlaying}
      onPressControl={handlePressControl}
      onPress={onPress}
      progress={position}
      duration={duration}
      track={activeTrack}
    />
  )
}

export default withTrackToggle(BottomPlayerContainer)
