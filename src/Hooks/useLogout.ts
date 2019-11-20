import { useCallback, useState } from 'react'
import { NavigationService, ROUTES } from 'src/navigation'
import { useApolloClient } from '@apollo/react-hooks'
import { storageKeys } from 'src/constants'
import { storage } from 'src/utils'
import gql from 'graphql-tag'

export interface LogoutProps {
  showLogoutPanel: () => void
}

const LOGOUT = gql`
  mutation {
    logoutMutation
  }
`

const useLogout = () => {
  const [isLoading, setLoading] = useState(false)

  const client = useApolloClient()

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

  return { isLoading, logout }
}

export default useLogout
