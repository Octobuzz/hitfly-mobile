import gql from 'graphql-tag'
import { Image } from '../schemas'

// email вытаскивается для предзагрузки в кеш
export const GET_PROFILE_HEAD = gql`
  query ProfileHead {
    profile: myProfile {
      userName: username
      followersCount
      email
      roles {
        slug
      }
      avatar(sizes: [size_235x235]) {
        imageUrl: url
      }
    }
  }
`

export interface GetProfileAvatarData {
  profile?: {
    avatar: Image[]
  }
}

export const GET_PROFILE_AVATAR = gql`
  query ProfileAvatar {
    profile: myProfile {
      avatar(sizes: [size_235x235]) {
        imageUrl: url
      }
    }
  }
`
