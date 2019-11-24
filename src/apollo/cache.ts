import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import storage from './storage'
import gql from 'graphql-tag'

export const defaults = {
  headerSettings: {
    mode: 'dark',
    state: 'main',
    __typename: 'HeaderSettings',
  },
  isPlaying: false,
  activeTrackId: null,
  activePlaylistKey: null,
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
    activePlaylistKey: String
  }
`

export default async (): Promise<InMemoryCache> => {
  const cache = new InMemoryCache({
    freezeResults: true,
    dataIdFromObject: (object: any) => {
      switch (object.__typename) {
        case 'ImageSizesType':
          return `ImageSizesType:${object.imageUrl}`
        case 'SocialConnectType':
          return `SocialConnectType:${object.type}`
        default:
          return defaultDataIdFromObject(object)
      }
    },

    cacheRedirects: {
      Query: {
        activeTrack: ({ activeTrackId }, _, { getCacheKey }) =>
          getCacheKey({ __typename: 'Track', id: activeTrackId }),
        selectedGenre: ({ currentGenreId }, _, { getCacheKey }) =>
          getCacheKey({ __typename: 'Genre', id: currentGenreId }),
        selectedCollection: ({ currentCollectionId }, _, { getCacheKey }) =>
          getCacheKey({ __typename: 'Collection', id: currentCollectionId }),
      },
    },
  })

  await persistCache({
    cache,
    debug: __DEV__,
    // @ts-ignore
    storage,
  })

  return cache
}
