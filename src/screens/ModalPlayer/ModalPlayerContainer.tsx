import React from 'react'
import ModalPlayer from './ModalPlayer'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { withTrackToggle, ToggleTrackProps } from 'src/HOCs'
import { useTrackActions } from 'src/Hooks'

interface Props extends ToggleTrackProps, NavigationStackScreenProps {}

const ModalPlayerContainer: React.FC<Props> = props => {
  const { toggleTrackToFavorites } = useTrackActions()
  return (
    <ModalPlayer toggleTrackToFavorites={toggleTrackToFavorites} {...props} />
  )
}

export default withTrackToggle(ModalPlayerContainer)
