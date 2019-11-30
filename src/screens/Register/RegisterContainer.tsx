import L from 'lodash'
import React, { useCallback } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { useMutation } from '@apollo/react-hooks'
import RegisterScreen from './Register'
import { routes } from 'src/constants'
import { storage } from 'src/apollo'
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
      avatar(sizes: [size_235x235]) {
        imageUrl: url
      }
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
      props.navigation.navigate(routes.AUTH.SELECT_GENRE)
    }
  }, [])

  const onPressPolicy = useCallback(() => {
    props.navigation.navigate(routes.AUTH.POLICY)
  }, [])

  return <RegisterScreen onPressPolicy={onPressPolicy} onSubmit={onSubmit} />
}

export default RegisterContainer
