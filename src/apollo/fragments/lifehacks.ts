import gql from 'graphql-tag'
import { getAdjustedPixelRatio } from './helpers'

export const COMMON_LIFEHACK = gql`
  fragment CommonLifehack on LifehackType {
    id
    title
    image(sizes: [size_300x300], factor: ${getAdjustedPixelRatio()}) {
      sizeName: size
      imageUrl: url
    }
  }
`
