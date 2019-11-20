import gql from 'graphql-tag'
import { HeaderSettings } from '../commonTypes'

export interface SetHeaderSettingsVariables {
  settings: Partial<HeaderSettings>
}

export const SET_HEADER_SETTINGS = gql`
  mutation SetHeaderSettings($settings: HeaderSettings!) {
    setHeaderSettings(settings: $settings) @client
  }
`
