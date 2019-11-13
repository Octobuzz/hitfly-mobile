import { Track } from '../schemas'
import gql from 'graphql-tag'

export interface ActiveTrackData {
  activeTrack?: Track
}

export const GET_ACTIVE_TRACK = gql`
  query {
    isPlaying
    activeTrack {
      id
      title
      cover(sizes: [size_290x290]) {
        imageUrl
      }
      group {
        title
      }
      fileUrl
      singer
      length
    }
  }
`

export interface ActivePlaylistData {
  playlist: Track[]
}

export const GET_ACTIVE_PLAYLIST = gql`
  query {
    playlist {
      id
      title
      cover(sizes: [size_290x290]) {
        imageUrl
      }
      group {
        title
      }
      fileUrl
      singer
      length
    }
  }
`
