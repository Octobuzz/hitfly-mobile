import gql from 'graphql-tag'
import { FavouriteLifehack } from '../schemas'

export interface LifehackFavoritesData {
  lifehack: FavouriteLifehack
}

export interface LifehackFavoritesVariables {
  id: number
}

export const ADD_LIFEHACK_TO_FAVORITES = gql`
  mutation AddLifehackToFavorites($id: Int!) {
    addToFavourites(
      Favourite: { favouriteableId: $id, favouritableType: life_hack }
    ) {
      ... on LifehackType {
        id
        hasFavorite: hasFavorite
      }
    }
  }
`

export const DELETE_LIFEHACK_FROM_FAVORITES = gql`
  mutation DeleteLifehackFromFavorites($id: Int!) {
    deleteFromFavourite(
      Favourite: { favouriteableId: $id, favouritableType: life_hack }
    ) {
      ... on LifehackType {
        id
        hasFavorite: hasFavorite
      }
    }
  }
`
export interface LifehackLikedData {
  lifehack: FavouriteLifehack
}

export interface LifehackLikedVariables {
  id: number
}

export const ADD_LIFEHACK_TO_LIKED = gql`
  mutation AddLifehackToLiked($id: Int!) {
    addLike(Like: { likeableId: $id, likeableType: life_hack }) {
      ... on LifehackType {
        id
        countLike
        hasLike: hasLike
      }
    }
  }
`

export const DELETE_LIFEHACK_FROM_LIKED = gql`
  mutation DeleteLifehackFromLiked($id: Int!) {
    unLikeMutation(Like: { likeableId: $id, likeableType: life_hack }) {
      ... on LifehackType {
        id
        countLike
        hasLike: hasLike
      }
    }
  }
`
