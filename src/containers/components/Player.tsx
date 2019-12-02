import React, { useEffect } from 'react'
import TrackPlayer from 'react-native-track-player'
import { useMutation } from '@apollo/react-hooks'
import {
  SET_ACTIVE_TRACK_ID,
  SetActiveTrackIdVariables,
  SET_IS_PLAYING,
  SetIsPlayingVariables,
  RESET_PLAYER,
} from 'src/apollo'

const Player: React.FC = () => {
  const [setActiveTrackId] = useMutation<any, SetActiveTrackIdVariables>(
    SET_ACTIVE_TRACK_ID,
  )
  const [setIsPlaying] = useMutation<any, SetIsPlayingVariables>(SET_IS_PLAYING)
  const [resetPlayer] = useMutation(RESET_PLAYER)

  useEffect(() => {
    const ended = TrackPlayer.addEventListener(
      'playback-queue-ended',
      async () => {
        setIsPlaying({ variables: { isPlaying: false } })
        await TrackPlayer.pause()
        TrackPlayer.seekTo(0)
      },
    )
    const changed = TrackPlayer.addEventListener(
      'playback-track-changed',
      async () => {
        const currentTrackId = await TrackPlayer.getCurrentTrack()
        setActiveTrackId({ variables: { id: +currentTrackId } })
      },
    )

    const stateChanged = TrackPlayer.addEventListener(
      'playback-state',
      ({ state }) => {
        switch (state) {
          case TrackPlayer.STATE_PAUSED: {
            setIsPlaying({ variables: { isPlaying: false } })
            break
          }
          case TrackPlayer.STATE_PLAYING: {
            setIsPlaying({ variables: { isPlaying: true } })
            break
          }
        }
      },
    )

    return () => {
      resetPlayer()
      TrackPlayer.reset()
      stateChanged.remove()
      changed.remove()
      ended.remove()
    }
  }, [])

  return null
}

export default Player
