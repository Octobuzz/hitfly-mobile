import L from 'lodash'
import React, { useCallback } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { useMutation } from '@apollo/react-hooks'
import { storageKeys } from 'src/constants'
import RegisterScreen from './Register'
import { ROUTES } from 'src/navigation'
import { storage } from 'src/utils'
import gql from 'graphql-tag'

const REGISTER = gql`
  mutation Register(
    $email: String!
    $password: String!
    $birthday: String!
    $gender: GenderType!
  ) {
    register: registrationMutation(
      email: $email
      password: $password
      birthday: $birthday
      gender: $gender
    ) {
      token: accessToken
    }
  }
`

interface Props extends NavigationStackScreenProps {}

const RegisterContainer: React.FC<Props> = props => {
  const [register] = useMutation(REGISTER)

  const onSubmit = useCallback(async values => {
    const result = await register({ variables: values })
    const token = L.get(result, 'data.register.token')
    if (token) {
      await storage.setToken(token)
      // TODO: это костыль, удалить когда бэк станет лучше
      await storage.setItem(storageKeys.GRAPHQL_ENDPOINT, 'user')
      props.navigation.navigate(ROUTES.AUTH.SELECT_GENRE)
    }
  }, [])

  return <RegisterScreen onSubmit={onSubmit} />
}

export default RegisterContainer
