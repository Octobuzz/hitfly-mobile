import React, { useEffect } from 'react'
import TrackPlayer from 'react-native-track-player'
import { useMutation } from '@apollo/react-hooks'
import {
  SetPlayerPropertiesVariables,
  SET_PLAYER_PROPERTIES,
  RESET_PLAYER,
} from 'src/apollo'
import { disableSkips, getSkipOptions } from 'src/helpers'

const setup = async (onSuccess: () => any) => {
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
  onSuccess()
}

const Player: React.FC = () => {
  const [setProperties] = useMutation<any, SetPlayerPropertiesVariables>(
    SET_PLAYER_PROPERTIES,
  )
  const [resetPlayer] = useMutation(RESET_PLAYER)

  useEffect(() => {
    let ended: TrackPlayer.EmitterSubscription
    let changed: TrackPlayer.EmitterSubscription
    let stateChanged: TrackPlayer.EmitterSubscription
    setup(() => {
      ended = TrackPlayer.addEventListener('playback-queue-ended', async () => {
        setProperties({ variables: { isPlaying: false } })
        await TrackPlayer.pause()
        TrackPlayer.seekTo(0)
      })
      changed = TrackPlayer.addEventListener(
        'playback-track-changed',
        async ({ nextTrack }) => {
          const queue = await TrackPlayer.getQueue()
          const skipOptions = getSkipOptions<string, TrackPlayer.Track>(
            nextTrack,
            queue,
          )
          setProperties({
            variables: {
              activeTrackId: +nextTrack,
              ...skipOptions,
            },
          })
          disableSkips(skipOptions)
        },
      )

      stateChanged = TrackPlayer.addEventListener(
        'playback-state',
        ({ state }) => {
          switch (state) {
            case TrackPlayer.STATE_PAUSED: {
              setProperties({ variables: { isPlaying: false } })
              break
            }
            case TrackPlayer.STATE_PLAYING: {
              setProperties({ variables: { isPlaying: true } })
              break
            }
          }
        },
      )
    })

    return () => {
      resetPlayer()
      TrackPlayer.reset()
      TrackPlayer.destroy()
      stateChanged.remove()
      changed.remove()
      ended.remove()
    }
  }, [])

  return null
}

export default Player
