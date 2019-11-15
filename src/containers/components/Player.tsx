import React, { useEffect } from 'react'
import TrackPlayer from 'react-native-track-player'
import { useMutation } from '@apollo/react-hooks'
import { SET_ACTIVE_TRACK_ID, SetActiveTrackIdVariables } from 'src/apollo'

const setup = async () => {
  await TrackPlayer.setupPlayer()
  TrackPlayer.updateOptions({
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

  useEffect(() => {
    setup()
    const changed = TrackPlayer.addEventListener(
      'playback-track-changed',
      async () => {
        const currentTrackId = await TrackPlayer.getCurrentTrack()
        setActiveTrackId({ variables: { id: +currentTrackId } })
      },
    )
    return () => {
      TrackPlayer.destroy()
      changed.remove()
    }
  }, [])

  useEffect(() => {}, [])

  return null
}

export default Player
