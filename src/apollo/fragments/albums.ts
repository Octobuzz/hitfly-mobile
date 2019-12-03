import gql from 'graphql-tag'
import { getAdjustedPixelRatio } from './helpers'

export const COMMON_ALBUM = gql`
  fragment CommonAlbum on Album {
    id
    title
    author
    cover(sizes: [size_300x300, size_160x160], factor: ${getAdjustedPixelRatio()}) {
      sizeName: size
      imageUrl: url
    }
  }
`
