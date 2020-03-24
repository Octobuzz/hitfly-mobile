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
      Favourite: { favouriteableId: $id, favouritableType: lifehack }
    ) {
      ... on Lifehack {
        id
        favouritesCount
        hasFavorite: userFavourite
      }
    }
  }
`

export const DELETE_LIFEHACK_FROM_FAVORITES = gql`
  mutation DeleteLifehackFromFavorites($id: Int!) {
    deleteFromFavourite(
      Favourite: { favouriteableId: $id, favouritableType: track }
    ) {
      ... on Lifehack {
        id
        favouritesCount
        hasFavorite: userFavourite
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
    addToLiked(Liked: { likedId: $id, likedType: lifehack }) {
      ... on Lifehack {
        id
        favouritesCount
        hasFavorite: userFavourite
      }
    }
  }
`

export const DELETE_LIFEHACK_FROM_LIKED = gql`
  mutation DeleteLifehackFromLiked($id: Int!) {
    deleteFromLiked(Favourite: { likedId: $id, likedType: track }) {
      ... on Lifehack {
        id
        favouritesCount
        hasFavorite: userFavourite
      }
    }
  }
`
