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

export const GET_LISTENED_NOW = gql`
  query {
    playlist: GetListenedNow(limit: 0, page: 0) {
      total
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
        }
      }
      hasMorePages: has_more_pages
    }
  }
`
