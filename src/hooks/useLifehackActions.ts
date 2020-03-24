// import { useCallback } from 'react'
// import { useMutation } from '@apollo/react-hooks'
import {
  // Track,
  // ADD_TRACK_TO_FAVORITES,
  // DELETE_TRACK_FROM_FAVORITES,
  // TrackFavoritesData,
  // TrackFavoritesVariables,
  Lifehack,
} from 'src/apollo'
// import {
//   ADD_LIFEHACK_TO_FAVORITES,
//   ADD_LIFEHACK_TO_LIKED,
//   DELETE_LIFEHACK_FROM_FAVORITES,
//   DELETE_LIFEHACK_FROM_LIKED,
//   LifehackFavoritesData,
//   LifehackFavoritesVariables,
//   LifehackLikedData,
//   LifehackLikedVariables,
// } from '../apollo/mutations/lifehack'

export interface FavoriteLifehackActionsProps {
  useLifehackFavoriteActions: (lifehack: Lifehack) => Promise<void>
}

const useLifehackFavoriteActions = () => {
  // const [toFavorites] = useMutation<
  //   LifehackFavoritesData,
  //   LifehackFavoritesVariables
  // >(ADD_LIFEHACK_TO_FAVORITES)
  // const [fromFavorites] = useMutation<
  //   LifehackFavoritesData,
  //   LifehackFavoritesVariables
  // >(DELETE_LIFEHACK_FROM_FAVORITES)

  // const toggleLifehackToFavorites = useCallback(
  //   async ({ id, isFavorite, favouritesCount }: Track): Promise<void> => {
  //     try {
  //       if (isFavorite) {
  //         await fromFavorites({
  //           variables: { id },
  //           optimisticResponse: {
  //             // @ts-ignore
  //             __typename: 'Mutation',
  //             deleteFromFavourite: {
  //               id,
  //               isFavorite: false,
  //               favouritesCount: favouritesCount - 1,
  //               __typename: 'Track',
  //             },
  //           },
  //         })
  //       } else {
  //         await toFavorites({
  //           variables: { id },
  //           optimisticResponse: {
  //             // @ts-ignore
  //             __typename: 'Mutation',
  //             addToFavourites: {
  //               id,
  //               isFavorite: true,
  //               favouritesCount: favouritesCount + 1,
  //               __typename: 'Track',
  //             },
  //           },
  //         })
  //       }
  //     } catch {}
  //   },
  //   [],
  // )

  return { useLifehackFavoriteActions }
}

const useLifehackLikedActions = () => {
  // const [toLiked] = useMutation<LifehackLikedData, LifehackLikedVariables>(
  //   ADD_LIFEHACK_TO_LIKED,
  // )
  // const [fromLiked] = useMutation<
  //   LifehackFavoritesData,
  //   LifehackFavoritesVariables
  // >(DELETE_LIFEHACK_FROM_LIKED)

  // const toggleLifehackToLiked = useCallback(
  //   async ({ id, isLiked, favouritesCount }: Lifehack): Promise<void> => {
  //     try {
  //       if (isLiked) {
  //         await fromLiked({
  //           variables: { id },
  //           optimisticResponse: {
  //             // @ts-ignore
  //             __typename: 'Mutation',
  //             deleteFromFavourite: {
  //               id,
  //               isFavorite: false,
  //               favouritesCount: favouritesCount - 1,
  //               __typename: 'Lifehack',
  //             },
  //           },
  //         })
  //       } else {
  //         await toLiked({
  //           variables: { id },
  //           optimisticResponse: {
  //             // @ts-ignore
  //             __typename: 'Mutation',
  //             addToFavourites: {
  //               id,
  //               isFavorite: true,
  //               favouritesCount: favouritesCount + 1,
  //               __typename: 'Lifehack',
  //             },
  //           },
  //         })
  //       }
  //     } catch {}
  //   },
  //   [],
  // )

  return { useLifehackLikedActions }
}

export default {
  useLifehackFavoriteActions,
  useLifehackLikedActions,
}
