import L from 'lodash'
import React, { useCallback } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import AuthSettingsScreen from './AuthSettings'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { routes } from 'src/constants'

const GET_PROFILE = gql`
  query {
    profile: myProfile {
      email
    }
  }
`

const UPDATE_EMAIL = gql`
  mutation updateEmail($email: String!) {
    updateMyProfile(profile: { email: $email }) {
      email
    }
  }
`

interface Props extends NavigationStackScreenProps {}

const AuthSettingsContainer: React.FC<Props> = props => {
  const { data } = useQuery(GET_PROFILE)

  const email = L.get(data, 'profile.email', '')

  const [updateEmail] = useMutation(UPDATE_EMAIL)

  const onSubmit = useCallback(values => updateEmail({ variables: values }), [])

  const onPressChangePassword = useCallback(() => {
    props.navigation.navigate(routes.MAIN.CHANGE_PASSWORD)
  }, [])

  return (
    <AuthSettingsScreen
      onPressChangePassword={onPressChangePassword}
      onSubmit={onSubmit}
      email={email}
      {...props}
    />
  )
}

export default AuthSettingsContainer
