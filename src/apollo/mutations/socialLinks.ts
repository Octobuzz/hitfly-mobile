import gql from 'graphql-tag'

export interface RemoveSocialLinkVariables {
  type: string
}

export const REMOVE_SOCIAL_LINK = gql`
  mutation RemoveSocialLink($type: SocialLinksTypeEnum) {
    RemoveSocialConnect(social: $type) {
      __typename
    }
  }
`
