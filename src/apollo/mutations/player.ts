import gql from 'graphql-tag'
import { Track } from '../schemas'

export interface SetPlayerPropertiesVariables {
  activeTrackId?: number
  activePlaylistKey?: string
  activePlaylist?: Track[]
  isPlaying?: boolean
  canPlayNext?: boolean
  canPlayPrev?: boolean
}

export const SET_PLAYER_PROPERTIES = gql`
  mutation SetPlayerProperties(
    $activeTrackId: Int
    $activePlaylistKey: String
    $activePlaylist: [Track]
    $isPlaying: Bool
    $canPlayNext: Bool
    $canPlayPrev: Bool
  ) {
    setPlayerProperties(
      activeTrackId: $activeTrackId
      activePlaylistKey: $activePlaylistKey
      activePlaylist: $activePlaylist
      isPlaying: $isPlaying
      canPlayNext: $canPlayNext
      canPlayPrev: $canPlayPrev
    ) @client
  }
`

export const RESET_PLAYER = gql`
  mutation ResetPlayer {
    resetPlayer @client
  }
`
