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
  isPlaying: false,
  activeTrackId: null,
  playlist: [],
}

export const typeDefs = gql`
  type HeaderSettings {
    style: String!
    state: String!
  }
  type Query {
    headerSettings: HeaderSettings!
    isPlaying: Boolean!
    activeTrackId: Int
  }
`

export default async (): Promise<InMemoryCache> => {
  const cache = new InMemoryCache({
    freezeResults: true,
    cacheRedirects: {
      Query: {
        activeTrack: ({ activeTrackId }, _, { getCacheKey }) =>
          getCacheKey({ __typename: 'Track', id: activeTrackId }),
        selectedGenre: ({ currentGenreId }, _, { getCacheKey }) =>
          getCacheKey({ __typename: 'Genre', id: currentGenreId }),
      },
    },
  })

  await persistCache({
    cache,
    debug: __DEV__,
    // @ts-ignore
    storage: storageInstance,
  })

  return cache
}
