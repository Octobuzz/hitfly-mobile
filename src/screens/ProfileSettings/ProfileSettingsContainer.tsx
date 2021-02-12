import L from 'lodash'
import React, { useCallback } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import AuthSettingsScreen from './ProfileSettings'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { routes } from 'src/constants'
import { PROFILE_AVATAR } from '../../apollo/fragments'

const GET_PROFILE = gql`
  query {
    profile: myProfile {
      userName: username
      location {
        title
      }
    }
  }
`

const GET_NAME = gql`
  query {
    profile: myProfile {
      userName: username
      location {
        title
      }
    }
  }
`
// ${PROFILE_AVATAR}

// todo => delete
// const GET_PROFILE_FOR_ABOUT = gql`
//   query {
//     profile: myProfile {
//       userName: username
//       followersCount
//       ...ProfileAvatar
//       roles {
//         slug
//       }
//       playsInGenres: genresPlay {
//         id
//         title: name
//       }
//       location {
//         title
//       }
//       description
//       careerStartDate: careerStart
//       bonusProgramLevel: bpLevelBonusProgram
//       bonusProgramPoints: bpPoints
//       daysInBonusProgram: bpDaysInProgram
//       favouritesTracksCount: favouritesTrackCount
//       musicGroups {
//         id
//         title: name
//         followersCount
//         cover: avatarGroup(sizes: [size_32x32]) {
//           imageUrl: url
//         }
//       }
//     }
//   }
//   ${PROFILE_AVATAR}
// `



const UPDATE_EMAIL = gql`
  mutation updateEmail($email: String!) {
    updateMyProfile(profile: { email: $email }) {
      email
    }
  }
`

const UPDATE_USERNAME = gql`
  mutation updateUsername($userName: String!) {
    updateMyProfile(profile: { username: $userName }) {
      username
    }
  }
`

const UPDATE_CITY = gql`
  mutation updateCity($city: String!) {
    updateMyProfile(profile: { location: { title: $city } }) {
      location {
        title
      }
    }
  }
`


interface Props extends NavigationStackScreenProps {}

const ProfileSettingsContainer: React.FC<Props> = props => {
  // debugger;
  const { data } = useQuery(GET_PROFILE)

  const email = L.get(data, 'profile.email', '')
  const userName = L.get(data, 'profile.userName', '')
  const city = L.get(data, 'profile.location.title', '')

  const [updateEmail] = useMutation(UPDATE_EMAIL)
  const [updateUsername] = useMutation(UPDATE_USERNAME)
  const [updateCity] = useMutation(UPDATE_CITY)

  // const onSubmit = useCallback(values => updateEmail({ variables: values }), [])
  const onSubmit = useCallback(values => updateUsername({ variables: values }), [])

  // const onPressChangePassword = useCallback(() => {
  //   props.navigation.navigate(routes.PROFILE.CHANGE_PASSWORD)
  // }, [])

  return (
    <AuthSettingsScreen
      onSubmit={onSubmit}
      userName={userName}
      {...props}
    />
  )
}

export default ProfileSettingsContainer
