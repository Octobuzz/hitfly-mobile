import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { storageInstance, storage } from 'src/utils'
import { names, storageKeys } from 'src/constants'

async function createApolloClient(): Promise<ApolloClient<InMemoryCache>> {
  const httpLink = createHttpLink({
    uri: names.BASE_URL,
  })

  const authLink = setContext(async (_, { headers }) => {
    const token = await storage.getItem(storageKeys.AUTH_TOKEN)
    return {
      headers: {
        ...headers,
        'X-TOKEN-AUTH': token,
      },
    }
  })

  const cache = new InMemoryCache({})

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
  })

  return client
}

export default createApolloClient
