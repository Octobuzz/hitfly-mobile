import gql from 'graphql-tag'
import { PixelRatio } from 'react-native'

export const PROFILE_AVATAR = gql`
  fragment ProfileAvatar on MyProfile {
    avatar(sizes: [size_235x235, size_56x56], factor: ${PixelRatio.get()}) {
      sizeName: size
      imageUrl: url
    }
  }
`

export const USER_AVATAR = gql`
  fragment UserAvatar on User {
    avatar(sizes: [size_235x235, size_56x56], factor: ${PixelRatio.get()}) {
      sizeName: size
      imageUrl: url
    }
  }
`
