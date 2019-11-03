import { ApolloClient } from 'apollo-client'
import { Alert } from 'react-native'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { withClientState } from 'apollo-link-state'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import { storage } from 'src/utils'
import { names, storageKeys } from 'src/constants'
import initCache, { defaults, typeDefs } from './cache'
import resolvers from './resolvers'

async function createApolloClient(): Promise<ApolloClient<InMemoryCache>> {
  const httpLink = createHttpLink({
    uri: names.BASE_URL,
  })

  const authLink = setContext(async (_, { headers }) => {
    const token = await storage.getItem(storageKeys.AUTH_TOKEN)
    // FIXME: это костыль, так как есть несколько эндпоинтов.
    // надеюсь в будущем будет 1 и тогда можно удалить
    const endpoint = await storage.getItem(storageKeys.GRAPHQL_ENDPOINT, '')
    const context: any = {
      headers: {
        ...headers,
        'X-TOKEN-AUTH': token,
      },
    }

    if (endpoint) {
      context.uri = `${names.BASE_URL}/${endpoint}`
    }
    return context
  })

  const cache = await initCache()

  const stateLink = withClientState({ cache, resolvers, defaults })

  const errorLink = onError(({ networkError }) => {
    if (networkError) {
      Alert.alert('Ошибка сети', networkError.message)
    }
  })

  const link = ApolloLink.from([authLink, stateLink, errorLink, httpLink])

  const client = new ApolloClient<InMemoryCache>({
    // @ts-ignore
    cache,
    link,
    resolvers,
    typeDefs,
    assumeImmutableResults: true,
  })

  client.onResetStore(stateLink.writeDefaults)

  return client
}

export default createApolloClient
