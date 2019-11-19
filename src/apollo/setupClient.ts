import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { storage } from 'src/utils'
import { names } from 'src/constants'
import initCache, { defaults, typeDefs } from './cache'
import errorLink from './errorLink'
import resolvers from './resolvers'

async function createApolloClient(): Promise<ApolloClient<InMemoryCache>> {
  const httpLink = createHttpLink({
    uri: names.BASE_URL,
    headers: {
      Accept: 'application/json',
    },
  })

  const authLink = setContext(async (_, { headers }) => {
    const token = await storage.getToken()
    const context: any = {
      headers: {
        ...headers,
        'X-TOKEN-AUTH': token,
      },
    }

    return context
  })

  const cache = await initCache()

  const link = ApolloLink.from([authLink, errorLink, httpLink])

  const client = new ApolloClient<InMemoryCache>({
    // @ts-ignore
    cache,
    link,
    resolvers,
    typeDefs,
    assumeImmutableResults: true,
  })

  cache.writeData({
    data: defaults,
  })

  client.onResetStore(() => {
    cache.writeData({
      data: defaults,
    })
  })

  return client
}

export default createApolloClient
