import gql from 'graphql-tag'
import { PixelRatio } from 'react-native'

export const COMMON_ALBUM = gql`
  fragment CommonAlbum on Album {
    id
    title
    author
    cover(sizes: [size_300x300, size_160x160], factor: ${PixelRatio.get()}) {
      sizeName: size
      imageUrl: url
    }
  }
`
