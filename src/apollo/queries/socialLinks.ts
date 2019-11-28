import gql from 'graphql-tag'
import { SocialConnect } from '../schemas'
import { COMMON_SOCIAL_LINK } from '../fragments'

export interface SocialLinksData {
  socialConnect: SocialConnect[]
}

export const GET_SOCIAL_LINKS = gql`
  query SocialLinks {
    socialConnect: SocialConnectQuery(filters: { mobile: true }) {
      ...CommonSocialLink
    }
  }
  ${COMMON_SOCIAL_LINK}
`

export const GET_PROFILE_SOCIAL_LINKS = gql`
  query ProfileSocialLinks {
    socialConnect: SocialConnectQuery(filters: { mobile: true }) {
      ...CommonSocialLink
      isLinked: connected
    }
  }
  ${COMMON_SOCIAL_LINK}
`
