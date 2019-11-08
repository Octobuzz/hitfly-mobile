import { Genre } from '../schemas'
import gql from 'graphql-tag'

export interface GenreData {
  genres?: Genre[]
}
export const GET_GENRES = gql`
  {
    genres: genre {
      id
      title: name
      imageUrl: image
    }
  }
`
