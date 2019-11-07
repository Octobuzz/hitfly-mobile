import L from 'lodash'
import React, { useCallback } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import {
  withHidingSplashScreen,
  withChangingHeaderSettings,
} from 'src/containers/HOCs'
import Login from './Login'
import { useMutation } from '@apollo/react-hooks'
import { storageKeys } from 'src/constants'
import { ROUTES } from 'src/navigation'
import { storage } from 'src/utils'
import gql from 'graphql-tag'

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login: loginMutation(email: $email, password: $password) {
      token: accessToken
    }
  }
`

interface Props extends NavigationStackScreenProps {}

const LoginContainer: React.FC<Props> = props => {
  const [login] = useMutation(LOGIN)

  const onSubmit = useCallback(async values => {
    try {
      // TODO: это костыль, удалить когда бэк станет лучше
      await storage.setItem(storageKeys.GRAPHQL_ENDPOINT, 'auth')
      const result = await login({ variables: values })
      const token = L.get(result, 'data.login.token')
      if (token) {
        await storage.setItem(storageKeys.AUTH_TOKEN, token as string)
        // TODO: это костыль, удалить когда бэк станет лучше
        await storage.setItem(storageKeys.GRAPHQL_ENDPOINT, 'user')
        props.navigation.navigate(ROUTES.MAIN.HOME)
      } else {
        // TODO: это костыль, удалить когда бэк станет лучше
        await storage.removeItem(storageKeys.GRAPHQL_ENDPOINT)
      }
    } catch (error) {
      // TODO: это костыль, удалить когда бэк станет лучше
      await storage.removeItem(storageKeys.GRAPHQL_ENDPOINT)
      // прокинуть ошибку дальше для валидации (последствия костыля)
      throw error
    }
  }, [])

  return <Login {...props} onSubmit={onSubmit} />
}

export default L.flowRight(
  withChangingHeaderSettings({ state: 'auth', mode: 'dark' }),
  withHidingSplashScreen,
)(LoginContainer)
