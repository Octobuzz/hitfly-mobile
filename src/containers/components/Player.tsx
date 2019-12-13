import React, { useEffect, useCallback } from 'react'
import TrackPlayer from 'react-native-track-player'
import { useMutation } from '@apollo/react-hooks'
import {
  SetPlayerPropertiesVariables,
  SET_PLAYER_PROPERTIES,
  RESET_PLAYER,
} from 'src/apollo'

const Player: React.FC = () => {
  const [setProperties] = useMutation<any, SetPlayerPropertiesVariables>(
    SET_PLAYER_PROPERTIES,
  )
  const [resetPlayer] = useMutation(RESET_PLAYER)

  const subscrubeToEvents = useCallback(() => {
    const result: TrackPlayer.EmitterSubscription[] = []
    result.push(
      TrackPlayer.addEventListener('playback-queue-ended', () => {
        setProperties({ variables: { isPlaying: false } })
        // await TrackPlayer.pause()
        // TrackPlayer.seekTo(0)
      }),
    )

    // result.push(
    //   TrackPlayer.addEventListener(
    //     'playback-track-changed',
    //     async ({ nextTrack, track }) => {
    //       const queue = await TrackPlayer.getQueue()
    //       const skipOptions = getSkipOptions<string, TrackPlayer.Track>(
    //         nextTrack,
    //         queue,
    //       )
    //       console.log({ nextTrack, queue, track })
    //       setProperties({
    //         variables: {
    //           activeTrackId: +nextTrack,
    //           ...skipOptions,
    //         },
    //       })
    //     },
    //   ),
    // )

    result.push(
      TrackPlayer.addEventListener('remote-play', () => {
        setProperties({ variables: { isPlaying: true } })
      }),
    )

    result.push(
      TrackPlayer.addEventListener('remote-pause', () => {
        setProperties({ variables: { isPlaying: false } })
      }),
    )

    result.push(
      TrackPlayer.addEventListener(
        'remote-next',
        ({ canPlayNext, canPlayPrev, currentTrack }) => {
          setProperties({
            variables: {
              canPlayNext,
              canPlayPrev,
              activeTrackId: +currentTrack,
            },
          })
        },
      ),
    )

    result.push(
      TrackPlayer.addEventListener(
        'remote-previous',
        ({ canPlayPrev, canPlayNext, currentTrack }) => {
          setProperties({
            variables: {
              canPlayPrev,
              canPlayNext,
              activeTrackId: +currentTrack,
            },
          })
        },
      ),
    )

    result.push(
      TrackPlayer.addEventListener(
        'remote-progress-ended',
        ({ canPlayPrev, canPlayNext, currentTrack }) => {
          setProperties({
            variables: {
              canPlayPrev,
              canPlayNext,
              activeTrackId: +currentTrack,
            },
          })
        },
      ),
    )

    // result.push(
    //   TrackPlayer.addEventListener('playback-state', ({ state }) => {
    //     switch (state) {
    //       case TrackPlayer.STATE_PAUSED: {
    //         setProperties({ variables: { isPlaying: false } })
    //         break
    //       }
    //       case TrackPlayer.STATE_PLAYING: {
    //         setProperties({ variables: { isPlaying: true } })
    //         break
    //       }
    //     }
    //   }),
    // )

    return result
  }, [])

  useEffect(() => {
    let subs: TrackPlayer.EmitterSubscription[] = []

    TrackPlayer.setupPlayer().then(() => {
      subs = subscrubeToEvents()
    })

    return () => {
      resetPlayer()
      TrackPlayer.reset()
      TrackPlayer.destroy()
      subs.forEach(sub => sub.remove())
    }
  }, [])

  return null
}

export default Player
