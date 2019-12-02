import gql from 'graphql-tag'
import { Image } from '../schemas'
import { PROFILE_AVATAR } from '../fragments'

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
      ...ProfileAvatar
    }
  }
  ${PROFILE_AVATAR}
`

export interface GetProfileAvatarData {
  profile?: {
    avatar: Image[]
  }
}

export const GET_PROFILE_AVATAR = gql`
  query ProfileAvatar {
    profile: myProfile {
      ...ProfileAvatar
    }
  }
  ${PROFILE_AVATAR}
`
