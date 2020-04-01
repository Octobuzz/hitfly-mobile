import { useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Lifehack } from 'src/apollo'
import {
  ADD_LIFEHACK_TO_FAVORITES,
  ADD_LIFEHACK_TO_LIKED,
  DELETE_LIFEHACK_FROM_FAVORITES,
  DELETE_LIFEHACK_FROM_LIKED,
  LifehackFavoritesData,
  LifehackFavoritesVariables,
  LifehackLikedData,
  LifehackLikedVariables,
} from '../apollo/mutations/lifehack'

export interface FavoriteLifehackActionsProps {
  useLifehackFavoriteActions: (lifehack: Lifehack) => Promise<void>
}

const useLifehackFavoriteActions = () => {
  const [toFavorites] = useMutation<
    LifehackFavoritesData,
    LifehackFavoritesVariables
  >(ADD_LIFEHACK_TO_FAVORITES)
  const [fromFavorites] = useMutation<
    LifehackFavoritesData,
    LifehackFavoritesVariables
  >(DELETE_LIFEHACK_FROM_FAVORITES)

  const toggleLifehackToFavorites = useCallback(
    async ({ id, hasFavorite }: Lifehack): Promise<void> => {
      try {
        if (hasFavorite) {
          await fromFavorites({
            variables: { id },
            optimisticResponse: {
              // @ts-ignore
              __typename: 'Mutation',
              deleteFromFavourite: {
                id,
                hasFavorite: false,
                __typename: 'Lifehack',
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
                id,
                hasFavorite: true,
                __typename: 'Lifehack',
              },
            },
          })
        }
      } catch {}
    },
    [],
  )

  return { toggleLifehackToFavorites }
}

const useLifehackLikedActions = () => {
  const [toLiked] = useMutation<LifehackLikedData, LifehackLikedVariables>(
    ADD_LIFEHACK_TO_LIKED,
  )
  const [fromLiked] = useMutation<
    LifehackFavoritesData,
    LifehackFavoritesVariables
  >(DELETE_LIFEHACK_FROM_LIKED)

  const toggleLifehackToLiked = useCallback(
    async ({
      id,
      hasLike,
      countLike,
      hasFavorite,
    }: Lifehack): Promise<void> => {
      try {
        if (hasLike) {
          await fromLiked({
            variables: { id },
            optimisticResponse: {
              // @ts-ignore
              __typename: 'Mutation',
              unLikeMutation: {
                id,
                hasLike: false,
                countLike: countLike - 1,
                hasFavorite: hasFavorite,
                __typename: 'Lifehack',
              },
            },
          })
        } else {
          await toLiked({
            variables: { id },
            optimisticResponse: {
              // @ts-ignore
              __typename: 'Mutation',
              addLike: {
                id,
                hasLike: true,
                countLike: countLike + 1,
                hasFavorite: hasFavorite,
                __typename: 'Lifehack',
              },
            },
          })
        }
      } catch {}
    },
    [],
  )

  return { toggleLifehackToLiked }
}

export default {
  useLifehackFavoriteActions,
  useLifehackLikedActions,
}
