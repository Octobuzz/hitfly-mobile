import { Track } from '../schemas'
import gql from 'graphql-tag'

export interface ActiveTrackData {
  isPlaying: boolean
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
  activePlaylistKey: string
  activePlaylist: Track[]
}

export const GET_ACTIVE_PLAYLIST = gql`
  query {
    activePlaylistKey @client
    activePlaylist @client {
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
