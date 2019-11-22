import { useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import {
  Track,
  ADD_TRACK_TO_FAVORITES,
  DELETE_TRACK_FROM_FAVORITES,
  TrackFavoritesData,
  TrackFavoritesVariables,
} from 'src/apollo'

export interface TrackActionsProps {
  toggleTrackToFavorites: (track: Track) => Promise<void>
}

const useTrackActions = () => {
  const [toFavorites] = useMutation<
    TrackFavoritesData,
    TrackFavoritesVariables
  >(ADD_TRACK_TO_FAVORITES)
  const [fromFavorites] = useMutation<
    TrackFavoritesData,
    TrackFavoritesVariables
  >(DELETE_TRACK_FROM_FAVORITES)

  const toggleTrackToFavorites = useCallback(
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

  return { toggleTrackToFavorites }
}

export default useTrackActions
