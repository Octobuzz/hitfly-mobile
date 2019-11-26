import gql from 'graphql-tag'
import { FavouriteTrack } from '../schemas'

export interface TrackFavoritesData {
  track: FavouriteTrack
}

export interface TrackFavoritesVariables {
  id: number
}

export const ADD_TRACK_TO_FAVORITES = gql`
  mutation AddTrackToFavorites($id: Int!) {
    addToFavourites(
      Favourite: { favouriteableId: $id, favouritableType: track }
    ) {
      ... on Track {
        id
        favouritesCount
        isFavorite: userFavourite
      }
    }
  }
`

export const DELETE_TRACK_FROM_FAVORITES = gql`
  mutation DeleteTrackFromFavorites($id: Int!) {
    deleteFromFavourite(
      Favourite: { favouriteableId: $id, favouritableType: track }
    ) {
      ... on Track {
        id
        favouritesCount
        isFavorite: userFavourite
      }
    }
  }
`
