import React, { useEffect } from 'react'
import TrackPlayer from 'react-native-track-player'
import { useMutation } from '@apollo/react-hooks'
import {
  SET_ACTIVE_TRACK_ID,
  SetActiveTrackIdVariables,
  SET_IS_PLAYING,
  SetIsPlayingVariables,
} from 'src/apollo'

const Player: React.FC = () => {
  const [setActiveTrackId] = useMutation<any, SetActiveTrackIdVariables>(
    SET_ACTIVE_TRACK_ID,
  )
  const [setIsPlaying] = useMutation<any, SetIsPlayingVariables>(SET_IS_PLAYING)

  useEffect(() => {
    const ended = TrackPlayer.addEventListener('playback-queue-ended', () => {
      setIsPlaying({ variables: { isPlaying: false } })
      TrackPlayer.seekTo(0)
    })
    const changed = TrackPlayer.addEventListener(
      'playback-track-changed',
      async () => {
        const currentTrackId = await TrackPlayer.getCurrentTrack()
        setActiveTrackId({ variables: { id: +currentTrackId } })
      },
    )

    return () => {
      TrackPlayer.stop()
      changed.remove()
      ended.remove()
    }
  }, [])

  return null
}

export default Player
