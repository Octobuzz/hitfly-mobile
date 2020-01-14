import gql from 'graphql-tag'
import { COMMON_SOCIAL_LINK } from '../fragments'

export interface RemoveSocialLinkVariables {
  type: string
}

export const REMOVE_SOCIAL_LINK = gql`
  mutation RemoveSocialLink($type: SocialLinksTypeEnum) {
    RemoveSocialConnect(social: $type, filters: { mobile: true }) {
      isLinked: connected
      ...CommonSocialLink
    }
  }
  ${COMMON_SOCIAL_LINK}
`
