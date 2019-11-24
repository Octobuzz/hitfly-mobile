import gql from 'graphql-tag'
import { SocialConnect } from '../schemas'

export interface SocialLinksData {
  socialConnect: SocialConnect[]
}

export const GET_SOCIAL_LINKS = gql`
  query {
    socialConnect: SocialConnectQuery(filters: { mobile: true }) {
      type: social_type
      url: link
    }
  }
`
