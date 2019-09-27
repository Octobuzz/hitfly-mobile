import React from 'react'
import { StatusBar, Platform } from 'react-native'
import { NavigationEventSubscription } from 'react-navigation'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import gql from 'graphql-tag'
import { Query } from '@apollo/react-components'
import { ProfileTabScreen } from 'src/screens'
import { Profile } from 'src/apollo'
import { Loader } from 'src/components'

const GET_PROFILE = gql`
  query {
    profile: myProfile {
      id
      userName: username
      followersCount
      avatar(sizes: [size_235x235]) {
        imageUrl: url
      }
    }
  }
`

interface ProfileData {
  profile?: Profile
}

class ProfileTab extends React.Component<NavigationStackScreenProps> {
  componentDidMount() {
    this.setupFocusListeners()
  }

  componentWillUnmount() {
    this.removeFocusListeners()
  }

  private willFocusSubscription?: NavigationEventSubscription
  private removeDidSubscription?: NavigationEventSubscription

  private setupFocusListeners = (): void => {
    const { navigation } = this.props
    this.willFocusSubscription = navigation.addListener('didFocus', () => {
      if (Platform.OS === 'ios') {
        StatusBar.setBarStyle('light-content', true)
      }
    })
    this.removeDidSubscription = navigation.addListener('willBlur', () => {
      if (Platform.OS === 'ios') {
        StatusBar.setBarStyle('dark-content', true)
      }
    })
  }

  private removeFocusListeners = (): void => {
    if (this.willFocusSubscription) {
      this.willFocusSubscription.remove()
    }
    if (this.removeDidSubscription) {
      this.removeDidSubscription.remove()
    }
  }

  render() {
    return (
      <Query<ProfileData> query={GET_PROFILE}>
        {({ loading, data }) => {
          if (loading) {
            return <Loader isAbsolute />
          }

          if (!data || !data.profile) {
            return null
          }

          return <ProfileTabScreen {...this.props} profile={data.profile} />
        }}
      </Query>
    )
  }
}

export default ProfileTab
