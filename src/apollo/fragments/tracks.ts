import gql from 'graphql-tag'
import { PixelRatio } from 'react-native'

export const COMMON_TRACK = gql`
  fragment CommonTrack on Track {
    id
    title: trackName
    cover(sizes: [size_300x300, size_160x160, size_32x32], factor: ${PixelRatio.get()}) {
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
