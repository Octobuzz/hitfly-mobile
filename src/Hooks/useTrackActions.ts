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
    async ({ id, isFavorite, favouritesCount }: Track): Promise<void> => {
      try {
        if (isFavorite) {
          await fromFavorites({
            variables: { id },
            optimisticResponse: {
              // @ts-ignore
              __typename: 'Mutation',
              deleteFromFavourite: {
                __typename: 'FavouriteTrack',
                track: {
                  __typename: 'Track',
                  favouritesCount: favouritesCount - 1,
                  id,
                  isFavorite: false,
                },
              },
            },
          })
        } else {
          await toFavorites({
            variables: { id },
            optimisticResponse: {
              // @ts-ignore
              __typename: 'Mutation',
              addToFavourites: {
                __typename: 'FavouriteTrack',
                track: {
                  __typename: 'Track',
                  favouritesCount: favouritesCount + 1,
                  id,
                  isFavorite: true,
                },
              },
            },
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
