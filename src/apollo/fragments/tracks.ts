import gql from 'graphql-tag'
import { getAdjustedPixelRatio } from './helpers'

export const COMMON_TRACK = gql`
  fragment CommonTrack on Track {
    id
    title: trackName
    cover(sizes: [size_300x300, size_160x160, size_32x32, size_235x235], factor: ${getAdjustedPixelRatio()}) {
      sizeName: size
      imageUrl: url
    }
    fileUrl: filename
    singer
    length
    favouritesCount
    isFavorite: userFavourite
  }
`

export const PLAYLIST_TRACK = gql`
  fragment PlaylistTrack on Track {
    id
    title: trackName
    cover(sizes: [size_32x32], factor: ${getAdjustedPixelRatio()}) {
      sizeName: size
      imageUrl: url
    }
    fileUrl: filename
    singer
    isFavorite: userFavourite
  }
`
