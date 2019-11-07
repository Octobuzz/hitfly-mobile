import React, { useCallback } from 'react'
import ApolloClient from 'apollo-client'
import { withApollo } from '@apollo/react-hoc'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { NavigationService, ROUTES } from 'src/navigation'
import { storageKeys } from 'src/constants'
import { storage } from 'src/utils'
import gql from 'graphql-tag'

export interface LogoutProps {
  logout: () => Promise<void>
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
    const logout = useCallback(async () => {
      const prevEndpoint = (await storage.getItem(
        storageKeys.GRAPHQL_ENDPOINT,
        '',
      )) as string
      try {
        // TODO: это костыль, удалить когда бэк станет лучше
        await storage.setItem(storageKeys.GRAPHQL_ENDPOINT, 'auth')

        await client.mutate({ mutation: LOGOUT })

        await storage.clearStorage()

        NavigationService.navigate({ routeName: ROUTES.AUTH.LOGIN })
        await client.resetStore()
      } catch (error) {
        // TODO: это костыль, удалить когда бэк станет лучше
        await storage.setItem(storageKeys.GRAPHQL_ENDPOINT, prevEndpoint)
      }
    }, [])

    return <WrappedComponent logout={logout} {...rest} />
  }
  // @ts-ignore
  return withApollo(Logout)
}

export default withLogout
