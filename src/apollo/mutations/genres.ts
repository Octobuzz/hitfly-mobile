import gql from 'graphql-tag'
import { COMMON_GENRE } from '../fragments'

export interface UpdateGenresVariables {
  genresIds: string[]
}

export const UPDATE_GENRES = gql`
  mutation UpdateGenres($genresIds: [ID]) {
    updateMyProfile(profile: { genres: $genresIds }) {
      favouriteGenres {
        ...CommonGenre
        hasSubGenres: haveSubGenres
      }
    }
  }
  ${COMMON_GENRE}
`
