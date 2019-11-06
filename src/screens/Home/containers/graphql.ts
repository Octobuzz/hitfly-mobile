import gql from 'graphql-tag'
import { Genre, Pagination, Track, User } from 'src/apollo'

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

export interface PlaylistData {
  playlist?: Pagination<Track>
}

export const GET_TOP50 = gql`
  query {
    playlist: GetTopFifty(limit: 50, page: 0) {
      items: data {
        length
      }
    }
  }
`

export const GET_LISTENED_NOW = gql`
  query {
    playlist: GetListenedNow(limit: 0, page: 0) {
      total
    }
  }
`

export const GET_NEW_TRACKS = gql`
  query Tracks($limit: Int = 10, $page: Int = 1) {
    playlist: tracks(limit: $limit, page: $page) {
      items: data {
        id
        title: trackName
        cover(sizes: [size_290x290]) {
          imageUrl: url
        }
        group: musicGroup {
          title: name
        }
        singer
      }
      hasMorePages: has_more_pages
    }
  }
`

export interface StarsData {
  users?: Pagination<User>
}

export const GET_STARS = gql`
  query {
    users(role: star, limit: 30, page: 1) {
      items: data {
        id
        userName: username
        avatar(sizes: [size_235x235]) {
          imageUrl: url
        }
      }
    }
  }
`

export const GET_TOP_WEEK_TRACKS = gql`
  query Tracks($limit: Int = 10, $page: Int = 1) {
    playlist: TopWeeklyQuery(limit: $limit, page: $page) {
      items: data {
        id
        title: trackName
        cover(sizes: [size_290x290]) {
          imageUrl: url
        }
        group: musicGroup {
          title: name
        }
        singer
      }
      hasMorePages: has_more_pages
    }
  }
`
