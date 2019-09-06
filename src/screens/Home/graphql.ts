import gql from 'graphql-tag'
import { Genre, Playlist, Pagination, Collection, Track } from 'src/apollo'

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
  playlist?: Pagination<Playlist>
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

export interface CollectionsData {
  collections?: Pagination<Collection>
}
export const GET_RECOMMENDED = gql`
  query {
    collections(limit: 10, page: 1, filters: { collection: true }) {
      items: data {
        id
        images: image(sizes: [size_290x290]) {
          imageUrl: url
        }
        title
        tracksCountInPlaylist: tracksCount
      }
    }
  }
`
export const GET_MUSIC_FAN = gql`
  query {
    collections(limit: 10, page: 1, filters: { superMusicFan: true }) {
      items: data {
        id
        images: image(sizes: [size_290x290]) {
          imageUrl: url
        }
        title
        tracksCountInPlaylist: tracksCount
      }
    }
  }
`

export interface TracksData {
  tracks?: Pagination<Track>
}
export const GET_NEW_TRACKS = gql`
  query {
    tracks(limit: 10, page: 0) {
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
    }
  }
`

export const GET_TOP_WEEK_TRACKS = gql`
  query {
    tracks: TopWeeklyQuery(limit: 10, page: 0) {
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
    }
  }
`

export const GET_LISTENED_NOW = gql`
  query {
    playlist: GetTopFifty(limit: 0, page: 0) {
      total
    }
  }
`
