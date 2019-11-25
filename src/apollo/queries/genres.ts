import { Genre, Profile, Pagination } from '../schemas'
import gql from 'graphql-tag'

// deprecated
export interface GenreData {
  genres?: Genre[]
}
// deprecated
export const DEPRECATED_GET_GENRES = gql`
  {
    genres: genre {
      id
      title: name
      imageUrl: image
    }
  }
`

export interface GenresData {
  genres: Pagination<Genre>
}

export const GET_GENRES = gql`
  query getGenres($limit: Int = 20, $page: Int = 1) {
    genres(limit: $limit, page: $page) {
      items: data {
        id
        title: name
        imageUrl: image
        hasSubGenres: haveSubGenres
      }
      hasMorePages: has_more_pages
    }
  }
`

// limit = 1000 - костыль, ибо так произошло
// надеюсь, в будущем поменяется логика выбора поджанров
// сейчас все поджанры автоматически должны быть выбраны
// а значит они нужны все и сразу, но запрос только с пагинацией
export const GET_SUB_GENRES = gql`
  query getSubGenres($limit: Int = 1000, $page: Int = 1, $rootGenreId: Int) {
    genres(limit: $limit, page: $page, rootGenreId: $rootGenreId) {
      items: data {
        id
        title: name
        imageUrl: image
      }
    }
  }
`

export interface FavoriteGenresData {
  profile: Pick<Profile, 'favouriteGenres'>
}

export const GET_FAVORITE_GENRES = gql`
  query {
    profile: myProfile {
      favouriteGenres {
        id
        title: name
        imageUrl: image
        hasSubGenres: haveSubGenres
      }
    }
  }
`
