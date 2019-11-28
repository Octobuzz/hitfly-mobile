import { Genre, Profile, Pagination } from '../schemas'
import { COMMON_GENRE } from '../fragments'
import gql from 'graphql-tag'

export interface GenresData {
  genres: Pagination<Genre>
}

export const GET_GENRES = gql`
  query Genres($limit: Int = 20, $page: Int = 1, $all: Boolean = false) {
    genres(limit: $limit, page: $page, all: $all) {
      items: data {
        ...CommonGenre
        hasSubGenres: haveSubGenres
      }
      hasMorePages: has_more_pages
    }
  }
  ${COMMON_GENRE}
`

// limit = 1000 - костыль, ибо так произошло
// надеюсь, в будущем поменяется логика выбора поджанров
// сейчас все поджанры автоматически должны быть выбраны
// а значит они нужны все и сразу, но запрос только с пагинацией
export const GET_SUB_GENRES = gql`
  query SubGenres($limit: Int = 1000, $page: Int = 1, $rootGenreId: Int) {
    genres(limit: $limit, page: $page, rootGenreId: $rootGenreId) {
      items: data {
        ...CommonGenre
      }
    }
  }
  ${COMMON_GENRE}
`

export interface FavoriteGenresData {
  profile: Pick<Profile, 'favouriteGenres'>
}

export const GET_FAVORITE_GENRES = gql`
  query FavoriteGenres {
    profile: myProfile {
      favouriteGenres {
        ...CommonGenre
        hasSubGenres: haveSubGenres
      }
    }
  }
  ${COMMON_GENRE}
`
