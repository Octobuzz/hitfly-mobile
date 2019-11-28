import L from 'lodash'
import React, { useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { withHidingSplashScreen, withChangingHeaderSettings } from 'src/HOCs'
import { routes } from 'src/constants'
import { storage } from 'src/apollo'
import Login from './Login'
import gql from 'graphql-tag'

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login: loginMutation(email: $email, password: $password) {
      token: accessToken
      avatar(sizes: [size_235x235]) {
        imageUrl: url
      }
    }
  }
`

interface Props extends NavigationStackScreenProps {}

const LoginContainer: React.FC<Props> = props => {
  const [login] = useMutation(LOGIN)

  const onSubmit = useCallback(async values => {
    const result = await login({ variables: values })
    const token = L.get(result, 'data.login.token')
    if (token) {
      await storage.setToken(token)
      props.navigation.navigate(routes.MAIN.HOME)
    }
  }, [])

  return <Login {...props} onSubmit={onSubmit} />
}

export default L.flowRight(
  withChangingHeaderSettings({ state: 'auth', mode: 'dark' }),
  withHidingSplashScreen,
)(LoginContainer)
