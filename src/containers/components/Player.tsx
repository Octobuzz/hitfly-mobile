import React, { useEffect, useCallback } from 'react'
import TrackPlayer from 'react-native-track-player'
import { useMutation } from '@apollo/react-hooks'
import {
  SetPlayerPropertiesVariables,
  SET_PLAYER_PROPERTIES,
  RESET_PLAYER,
} from 'src/apollo'

interface SkipOptions {
  canPlayNext: boolean
  canPlayPrev: boolean
  currentTrack: string
}

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
      }),
    )

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

    const updateSkipProps = ({
      canPlayNext,
      canPlayPrev,
      currentTrack,
    }: SkipOptions) => {
      setProperties({
        variables: {
          canPlayNext,
          canPlayPrev,
          activeTrackId: +currentTrack,
        },
      })
    }

    result.push(TrackPlayer.addEventListener('remote-next', updateSkipProps))

    result.push(
      TrackPlayer.addEventListener('remote-previous', updateSkipProps),
    )

    result.push(
      TrackPlayer.addEventListener('remote-progress-ended', updateSkipProps),
    )

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
