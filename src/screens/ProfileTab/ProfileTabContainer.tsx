import L from 'lodash'
import React from 'react'
import { graphql, DataProps } from '@apollo/react-hoc'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import ProfileTabScreen from './ProfileTab'
import { Profile, GET_PROFILE_HEAD } from 'src/apollo'
import { Loader } from 'src/components'
import {
  withDetailedTrackMenu,
  withChangingHeaderSettings,
  DetailedTrackMenuProps,
} from 'src/HOCs'

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

export default L.flowRight(
  graphql(GET_PROFILE_HEAD),
  withChangingHeaderSettings({ state: 'profile', mode: 'light' }),
  withDetailedTrackMenu,
)(ProfileTab)
