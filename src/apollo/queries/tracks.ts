import { Pagination, Track } from '../schemas'
import gql from 'graphql-tag'

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

export const GET_NEW_TRACKS = gql`
  query NewTracks($limit: Int = 10, $page: Int = 1) {
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
        length
        favouritesCount
      }
      hasMorePages: has_more_pages
    }
  }
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
        id
        title: trackName
        group: musicGroup {
          title: name
        }
        singer
        fileUrl: filename
        cover(sizes: [size_290x290]) {
          imageUrl: url
        }
        length
        favouritesCount
      }
      hasMorePages: has_more_pages
    }
  }
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
        id
        title: trackName
        group: musicGroup {
          title: name
        }
        singer
        fileUrl: filename
        cover(sizes: [size_290x290]) {
          imageUrl: url
        }
        length
        favouritesCount
      }
      hasMorePages: has_more_pages
    }
  }
`

export const GET_GENRE_TRACKS = gql`
  query CurrentGenreTracks($genreId: Int!, $limit: Int = 10, $page: Int = 1) {
    currentGenreId @client @export(as: "genreId")
    playlist: tracks(limit: $limit, page: $page, filters: { genre: $genreId }) {
      items: data {
        id
        title: trackName
        group: musicGroup {
          title: name
        }
        singer
        fileUrl: filename
        cover(sizes: [size_290x290]) {
          imageUrl: url
        }
        length
        favouritesCount
      }
      hasMorePages: has_more_pages
    }
  }
`

export const GET_TOP_WEEK_TRACKS = gql`
  query TopWeekTracks($limit: Int = 10, $page: Int = 1) {
    playlist: TopWeeklyQuery(limit: $limit, page: $page) {
      items: data {
        id
        title: trackName
        group: musicGroup {
          title: name
        }
        singer
        fileUrl: filename
        cover(sizes: [size_290x290]) {
          imageUrl: url
        }
        length
        favouritesCount
      }
      hasMorePages: has_more_pages
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

export const GET_LISTENED_NOW_TRACKS = gql`
  query ListenedNowTracks($limit: Int = 10, $page: Int = 1) {
    playlist: GetListenedNow(limit: $limit, page: $page) {
      items: data {
        id
        title: trackName
        group: musicGroup {
          title: name
        }
        singer
        fileUrl: filename
        cover(sizes: [size_290x290]) {
          imageUrl: url
        }
        length
        favouritesCount
      }
      hasMorePages: has_more_pages
    }
  }
`

export const GET_MY_MUSIC = gql`
  query MyTracks($limit: Int = 10, $page: Int = 1) {
    tracks(limit: $limit, page: $page, filters: { my: true }) {
      items: data {
        id
        title: trackName
        group: musicGroup {
          title: name
        }
        singer
        fileUrl: filename
        cover(sizes: [size_290x290]) {
          imageUrl: url
        }
        length
        favouritesCount
      }
      hasMorePages: has_more_pages
    }
  }
`

export const GET_LIKED_MUSIC = gql`
  query LikedTracks($limit: Int = 10, $page: Int = 1) {
    tracks: favouriteTrack(limit: $limit, page: $page) {
      items: data {
        id
        track {
          id
          title: trackName
          group: musicGroup {
            title: name
          }
          singer
          fileUrl: filename
          cover(sizes: [size_290x290]) {
            imageUrl: url
          }
          length
          favouritesCount
        }
      }
      hasMorePages: has_more_pages
    }
  }
`
