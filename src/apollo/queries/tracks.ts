import { Pagination, Track } from '../schemas'
import { COMMON_TRACK } from '../fragments'
import gql from 'graphql-tag'

export const GET_DETAILED_TRACK = gql`
  query {
    detailedTrack @client {
      ...CommonTrack
    }
  }
  ${COMMON_TRACK}
`

export interface PlaylistData {
  playlist?: Pagination<Track>
}

export const GET_TOP50 = gql`
  query {
    playlist: GetTopFifty(limit: 50, page: 0) {
      total
    }
  }
`

export const GET_TOP50_TRACKS = gql`
  query {
    playlist: GetTopFifty(limit: 50, page: 0) {
      items: data {
        ...CommonTrack
      }
    }
  }
  ${COMMON_TRACK}
`

export const GET_NEW_TRACKS = gql`
  query NewTracks($limit: Int = 10, $page: Int = 1) {
    playlist: tracks(limit: $limit, page: $page) {
      items: data {
        ...CommonTrack
      }
      hasMorePages: has_more_pages
    }
  }
  ${COMMON_TRACK}
`

export const GET_ALBUM_TRACKS = gql`
  query CurrentAlbumTracks($albumId: Int!, $limit: Int = 10, $page: Int = 1) {
    currentAlbumId @client @export(as: "albumId")
    playlist: tracks(
      limit: $limit
      page: $page
      filters: { albumId: $albumId }
    ) {
      items: data {
        ...CommonTrack
      }
      hasMorePages: has_more_pages
    }
  }
  ${COMMON_TRACK}
`

export const GET_COLLECTION_TRACKS = gql`
  query CurrentCollectionTracks(
    $collectionId: Int!
    $limit: Int = 10
    $page: Int = 1
  ) {
    currentCollectionId @client @export(as: "collectionId")
    playlist: tracks(
      limit: $limit
      page: $page
      filters: { collectionId: $collectionId }
    ) {
      items: data {
        ...CommonTrack
      }
      hasMorePages: has_more_pages
    }
  }
  ${COMMON_TRACK}
`

export const GET_GENRE_TRACKS = gql`
  query CurrentGenreTracks($genreId: Int!, $limit: Int = 10, $page: Int = 1) {
    currentGenreId @client @export(as: "genreId")
    playlist: tracks(limit: $limit, page: $page, filters: { genre: $genreId }) {
      items: data {
        ...CommonTrack
      }
      hasMorePages: has_more_pages
    }
  }
  ${COMMON_TRACK}
`

export const GET_TOP_WEEK_TRACKS = gql`
  query TopWeekTracks($limit: Int = 10, $page: Int = 1) {
    playlist: TopWeeklyQuery(limit: $limit, page: $page) {
      items: data {
        ...CommonTrack
      }
      hasMorePages: has_more_pages
    }
  }
  ${COMMON_TRACK}
`

export const GET_LISTENED_NOW = gql`
  query {
    playlist: GetListenedNow(limit: 0, page: 0) {
      total
    }
  }
`

export const GET_LISTENED_NOW_TRACKS = gql`
  query ListenedNowTracks($limit: Int = 10, $page: Int = 1) {
    playlist: GetListenedNow(limit: $limit, page: $page) {
      items: data {
        ...CommonTrack
      }
      hasMorePages: has_more_pages
    }
  }
  ${COMMON_TRACK}
`

export const GET_MY_MUSIC = gql`
  query MyTracks($limit: Int = 10, $page: Int = 1) {
    tracks(limit: $limit, page: $page, filters: { my: true }) {
      items: data {
        ...CommonTrack
      }
      hasMorePages: has_more_pages
    }
  }
  ${COMMON_TRACK}
`

export const GET_LIKED_MUSIC = gql`
  query LikedTracks($limit: Int = 10, $page: Int = 1) {
    tracks: favouriteTrack(limit: $limit, page: $page) {
      items: data {
        id
        track {
          ...CommonTrack
        }
      }
      hasMorePages: has_more_pages
    }
  }
  ${COMMON_TRACK}
`

// FIXME: это общий интерфейс для всех треков должен быть
export interface TracksWithFeedbackData {
  tracks: Pagination<Track>
}

export const GET_MY_TRACKS_WITH_FEEDBACK = gql`
  query FeedbackTracks(
    $limit: Int = 20
    $page: Int = 1
    $period: CommentPeriodEnum = week
  ) {
    tracks(
      limit: $limit
      page: $page
      commentPeriod: $period
      filters: { my: true }
    ) {
      items: data {
        ...CommonTrack
        comments(commentPeriod: $period) {
          id
          comment
          createdAt
          createdBy: user {
            id
            userName: username
            avatar(sizes: [size_235x235]) {
              imageUrl: url
            }
          }
        }
      }
      hasMorePages: has_more_pages
    }
  }
  ${COMMON_TRACK}
`
