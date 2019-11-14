import { Track } from '../schemas'
import gql from 'graphql-tag'

export interface ActiveTrackData {
  activeTrack?: Track
}

export const GET_ACTIVE_TRACK = gql`
  query {
    isPlaying @client
    activeTrack @client {
      id
      title: trackName
      cover(sizes: [size_290x290]) {
        imageUrl: url
      }
      group: musicGroup {
        title: name
      }
      fileUrl: filename
      singer
      length
      favouritesCount
    }
  }
`

export interface ActivePlaylistData {
  playlist: Track[]
}

export const GET_ACTIVE_PLAYLIST = gql`
  query {
    playlist @client {
      id
      title: trackName
      cover(sizes: [size_290x290]) {
        imageUrl: url
      }
      group: musicGroup {
        title: name
      }
      fileUrl: filename
      singer
      length
      favouritesCount
    }
  }
`
