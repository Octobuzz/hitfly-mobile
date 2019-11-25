import gql from 'graphql-tag'

export const COMMON_SOCIAL_LINK = gql`
  fragment CommonSocialLink on SocialConnectType {
    type: social_type
    url: link
  }
`
