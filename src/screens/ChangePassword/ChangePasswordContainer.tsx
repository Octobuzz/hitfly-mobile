import React, { useCallback } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import ChangePasswordScreen from './ChangePassword'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const UPDATE_PASSWORD = gql`
  mutation updatePassword($password: String!) {
    updateMyProfile(profile: { password: $password, username: "" }) {
      __typename
    }
  }
`

interface Props extends NavigationStackScreenProps {}

const ChangePasswordContainer: React.FC<Props> = props => {
  const [updatePassword] = useMutation(UPDATE_PASSWORD)

  const onSubmit = useCallback(
    values => updatePassword({ variables: values }),
    [],
  )

  return <ChangePasswordScreen onSubmit={onSubmit} {...props} />
}

export default ChangePasswordContainer
