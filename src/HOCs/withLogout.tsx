import React, { useCallback, useState } from 'react'
import ApolloClient from 'apollo-client'
import { withApollo } from '@apollo/react-hoc'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { NavigationService, ROUTES } from 'src/navigation'
import { storageKeys } from 'src/constants'
import { storage } from 'src/utils'
import gql from 'graphql-tag'

export interface LogoutProps {
  logout: () => Promise<void>
  isLoginingOut: boolean
}

interface Props {
  client: ApolloClient<InMemoryCache>
}

const LOGOUT = gql`
  mutation {
    logoutMutation
  }
`

const withLogout = (WrappedComponent: React.ComponentType<LogoutProps>) => {
  const Logout: React.FC<Props> = ({ client, ...rest }) => {
    const [isLoading, setLoading] = useState(false)

    const logout = useCallback(async () => {
      try {
        setLoading(true)
        await client.mutate({ mutation: LOGOUT })
      } catch (error) {
        // TODO: добавить обработчик в error-link тогда ошибка сюда не должна дойти
      } finally {
        await storage.clearStorage()
        // пропуск приветсвенного экрана
        await storage.setItem(storageKeys.SKIP_WELCOME, true)

        NavigationService.navigate({ routeName: ROUTES.AUTH.LOGIN })
        client.resetStore()
        setLoading(false)
      }
    }, [])

    return (
      <WrappedComponent isLoginingOut={isLoading} logout={logout} {...rest} />
    )
  }
  // @ts-ignore
  return withApollo(Logout)
}

export default withLogout
