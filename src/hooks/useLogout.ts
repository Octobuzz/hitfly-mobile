import { useCallback, useState, useContext } from 'react'
import { NavigationContext } from 'react-navigation'
import { useApolloClient } from '@apollo/react-hooks'
import { storageKeys, routes } from 'src/constants'
import { storage } from 'src/apollo'
import gql from 'graphql-tag'

const LOGOUT = gql`
  mutation {
    logoutMutation
  }
`

const useLogout = () => {
  const [isLoading, setLoading] = useState(false)

  const client = useApolloClient()

  const navigation = useContext(NavigationContext)
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

      navigation.navigate({ routeName: routes.AUTH.LOGIN })
      client.clearStore()
      setLoading(false)
    }
  }, [])

  return { isLoading, logout }
}

export default useLogout
