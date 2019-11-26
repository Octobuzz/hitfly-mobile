import React, { useEffect } from 'react'
import TrackPlayer from 'react-native-track-player'
import { useMutation } from '@apollo/react-hooks'
import {
  SET_ACTIVE_TRACK_ID,
  SetActiveTrackIdVariables,
  SET_IS_PLAYING,
  SetIsPlayingVariables,
} from 'src/apollo'

const setup = async () => {
  await TrackPlayer.setupPlayer()
  await TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SEEK_TO,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
    ],
  })
}

const Player: React.FC = () => {
  const [setActiveTrackId] = useMutation<any, SetActiveTrackIdVariables>(
    SET_ACTIVE_TRACK_ID,
  )
  const [setIsPlaying] = useMutation<any, SetIsPlayingVariables>(SET_IS_PLAYING)

  useEffect(() => {
    let ended: TrackPlayer.EmitterSubscription
    let changed: TrackPlayer.EmitterSubscription
    setup().then(() => {
      ended = TrackPlayer.addEventListener('playback-queue-ended', () => {
        setIsPlaying({ variables: { isPlaying: false } })
        TrackPlayer.seekTo(0)
      })
      changed = TrackPlayer.addEventListener(
        'playback-track-changed',
        async () => {
          const currentTrackId = await TrackPlayer.getCurrentTrack()
          setActiveTrackId({ variables: { id: +currentTrackId } })
        },
      )
    })

    return () => {
      TrackPlayer.stop()
      TrackPlayer.destroy()
      changed.remove()
      ended.remove()
    }
  }, [])

  return null
}

export default Player
