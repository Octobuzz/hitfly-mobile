import gql from 'graphql-tag'
import { HeaderSettings } from '../commonTypes'

export interface HeaderSettingsData {
  headerSettings: HeaderSettings
}

export const GET_HEADER_SETTINGS = gql`
  query {
    headerSettings @client {
      mode
      state
    }
  }
`
