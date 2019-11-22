import React, { useCallback } from 'react'
import ModalPlayer from './ModalPlayer'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { useMutation } from '@apollo/react-hooks'
import { withTrackToggle, ToggleTrackProps } from 'src/HOCs'
import {
  Track,
  ADD_TRACK_TO_FAVORITES,
  DELETE_TRACK_FROM_FAVORITES,
  TrackFavoritesData,
  TrackFavoritesVariables,
} from 'src/apollo'

interface Props extends ToggleTrackProps, NavigationStackScreenProps {}

const ModalPlayerContainer: React.FC<Props> = props => {
  const [toFavorites] = useMutation<
    TrackFavoritesData,
    TrackFavoritesVariables
  >(ADD_TRACK_TO_FAVORITES)
  const [fromFavorites] = useMutation<
    TrackFavoritesData,
    TrackFavoritesVariables
  >(DELETE_TRACK_FROM_FAVORITES)
  const addTrackToFavorites = useCallback(
    async ({ id, isFavorite }: Track): Promise<void> => {
      try {
        if (isFavorite) {
          await fromFavorites({
            variables: { id },
          })
        } else {
          await toFavorites({
            variables: { id },
          })
        }
      } catch {
        // TODO: добавить обработчик?
      }
    },
    [],
  )
  return <ModalPlayer addTrackToFavorites={addTrackToFavorites} {...props} />
}

export default withTrackToggle(ModalPlayerContainer)
