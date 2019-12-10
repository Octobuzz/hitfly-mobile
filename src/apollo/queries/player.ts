import { Track } from '../schemas'
import { COMMON_TRACK } from '../fragments'
import gql from 'graphql-tag'

export interface ActiveTrackData {
  isPlaying: boolean
  activeTrack?: Track
  canPlayNext: boolean
  canPlayPrev: boolean
}

export const GET_ACTIVE_TRACK = gql`
  query ActiveTrack {
    canPlayNext @client
    canPlayPrev @client
    isPlaying @client
    activeTrack @client {
      ...CommonTrack
    }
  }
  ${COMMON_TRACK}
`

export interface ActivePlaylistData {
  activePlaylistKey: string
  activePlaylist: Track[]
}

export const GET_ACTIVE_PLAYLIST = gql`
  query ActivePlaylist {
    activePlaylistKey @client
    activePlaylist @client {
      ...CommonTrack
    }
  }
  ${COMMON_TRACK}
`
