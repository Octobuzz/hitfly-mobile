import gql from 'graphql-tag'
import { Track } from '../schemas'

export interface SetActiveTrackIdVariables {
  id: number
}

export const SET_ACTIVE_TRACK_ID = gql`
  mutation SetActiveTrackId($id: Int!) {
    setActiveTrackId(id: $id) @client
  }
`

export interface SetActivePlaylistVariables {
  playlist: Track[]
}

export const SET_ACTIVE_PLAYLIST = gql`
  mutation SetActivePlaylist($playlist: [Track]!) {
    setActivePlaylist(playlist: $playlist) @client
  }
`

export interface SetIsPlayingVariables {
  isPlaying: boolean
}

export const SET_IS_PLAYING = gql`
  mutation SetIsPlaying($isPlaying: Bool!) {
    setIsPlaying(isPlaying: $isPlaying) @client
  }
`
