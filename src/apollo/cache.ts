import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { storageInstance } from 'src/utils'
import gql from 'graphql-tag'

export const defaults = {
  headerSettings: {
    mode: 'dark',
    state: 'main',
    __typename: 'HeaderSettings',
  },
}

export const typeDefs = gql`
  type HeaderSettings {
    style: String!
    state: String!
  }
`

export default async (): Promise<InMemoryCache> => {
  const cache = new InMemoryCache({
    freezeResults: true,
  })

  await persistCache({
    cache,
    debug: __DEV__,
    // @ts-ignore
    storage: storageInstance,
  })

  return cache
}
