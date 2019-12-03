import gql from 'graphql-tag'
import { getAdjustedPixelRatio } from './helpers'

export const PROFILE_AVATAR = gql`
  fragment ProfileAvatar on MyProfile {
    avatar(sizes: [size_235x235, size_56x56], factor: ${getAdjustedPixelRatio()}) {
      sizeName: size
      imageUrl: url
    }
  }
`

export const USER_AVATAR = gql`
  fragment UserAvatar on User {
    avatar(sizes: [size_235x235, size_56x56], factor: ${getAdjustedPixelRatio()}) {
      sizeName: size
      imageUrl: url
    }
  }
`
