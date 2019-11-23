import React from 'react'
import ModalPlaylist from './ModalPlaylist'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { withTrackToggle, ToggleTrackProps } from 'src/HOCs'
import { useTrackActions } from 'src/Hooks'

interface Props extends ToggleTrackProps, NavigationStackScreenProps {}

const ModalPlaylistContainer: React.FC<Props> = props => {
  const { toggleTrackToFavorites } = useTrackActions()
  return (
    <ModalPlaylist toggleTrackToFavorites={toggleTrackToFavorites} {...props} />
  )
}

export default withTrackToggle(ModalPlaylistContainer)
