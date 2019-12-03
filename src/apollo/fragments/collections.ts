import gql from 'graphql-tag'
import { PixelRatio } from 'react-native'

export const COMMON_COLLECTION = gql`
  fragment CommonCollection on Collection {
    id
    image: image(sizes: [size_160x160, size_300x300], factor: ${PixelRatio.get()}) {
      sizeName: size
      imageUrl: url
    }
    title
    tracksCountInPlaylist: tracksCount
  }
`
