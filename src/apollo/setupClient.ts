import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { storageInstance, storage } from 'src/utils'
import { names, storageKeys } from 'src/constants'
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

  const cache = new InMemoryCache({
    freezeResults: true,
  })

  await persistCache({
    cache,
    debug: __DEV__,
    // @ts-ignore
    storage: storageInstance,
  })

  const client = new ApolloClient<InMemoryCache>({
    // @ts-ignore
    cache,
    link: authLink.concat(httpLink),
    resolvers,
  })

  return client
}

export default createApolloClient
