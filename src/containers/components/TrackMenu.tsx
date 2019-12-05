import React from 'react'
import { TrackMenu, TrackMenuProps } from 'src/components'
import { useTrackActions } from 'src/hooks'

interface Props extends Omit<TrackMenuProps, 'onPressLike'> {}

const TrackMenuContainer: React.FC<Props> = props => {
  const { toggleTrackToFavorites } = useTrackActions()

  return <TrackMenu {...props} onPressLike={toggleTrackToFavorites} />
}

export default TrackMenuContainer
