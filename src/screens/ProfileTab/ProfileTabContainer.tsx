import L from 'lodash'
import React from 'react'
import { graphql, DataProps } from '@apollo/react-hoc'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import ProfileTabScreen from './ProfileTab'
import { Profile } from 'src/apollo'
import { Loader } from 'src/components'
import {
  withDetailedTrackMenu,
  withChangingHeaderSettings,
  DetailedTrackMenuProps,
} from 'src/containers/HOCs'
import gql from 'graphql-tag'

interface Props
  extends DataProps<{ profile?: Profile }>,
    NavigationStackScreenProps,
    DetailedTrackMenuProps {}

const ProfileTab: React.FC<Props> = ({
  data: { loading, profile },
  ...rest
}) => {
  if (loading) {
    return <Loader isAbsolute />
  }
  if (!profile) {
    return null
  }
  return <ProfileTabScreen {...rest} profile={profile} />
}

// email вытаскивается для предзагрузки в кеш
const GET_PROFILE = gql`
  query {
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

export default L.flowRight(
  graphql<Props>(GET_PROFILE, {
    options: { fetchPolicy: 'cache-and-network' },
  }),
  withChangingHeaderSettings({ state: 'profile', mode: 'light' }),
  withDetailedTrackMenu,
)(ProfileTab)
