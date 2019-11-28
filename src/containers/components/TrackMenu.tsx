import React from 'react'
import { TrackMenu } from 'src/components'
import { useTrackActions } from 'src/Hooks'

interface Props {}

const TrackMenuContainer: React.FC<Props> = props => {
  const { toggleTrackToFavorites } = useTrackActions()

  return <TrackMenu {...props} onPressLike={toggleTrackToFavorites} />
}

export default TrackMenuContainer
