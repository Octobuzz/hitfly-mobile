import {
  InMemoryCache,
  defaultDataIdFromObject,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import introspectionQueryResultData from './fragmentTypes.json'
import storage from './storage'
import gql from 'graphql-tag'

export const defaults = {
  headerSettings: {
    mode: 'dark',
    state: 'main',
    __typename: 'HeaderSettings',
  },
  isPlaying: false,
  canPlayNext: false,
  canPlayPrev: false,
  activeTrackId: null,
  detailedTrackId: null,
  activePlaylistKey: null,
  activePlaylistIds: [],
}

export const typeDefs = gql`
  type HeaderSettings {
    style: String!
    state: String!
  }
  type Query {
    headerSettings: HeaderSettings!
    isPlaying: Boolean!
    activeTrackId: ID
    detailedTrackId: ID
    activePlaylistKey: String
    activePlaylistIds: [ID]!
  }
`

export default async (): Promise<InMemoryCache> => {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
  })

  const cache = new InMemoryCache({
    fragmentMatcher,
    freezeResults: true,
    dataIdFromObject: (object: any) => {
      switch (object.__typename) {
        case 'ImageSizesType':
          return `ImageSizesType:${object.imageUrl}`
        case 'SocialConnectType':
          return `SocialConnectType:${object.type}`
        // MyProfile - единственный в своем роде
        case 'MyProfile':
          return `MyProfile`
        default:
          return defaultDataIdFromObject(object)
      }
    },

    cacheRedirects: {
      Query: {
        activeTrack: ({ activeTrackId }, _, { getCacheKey }) =>
          getCacheKey({ __typename: 'Track', id: activeTrackId }),
        activePlaylist: ({ activePlaylistIds }, _, { getCacheKey }) =>
          activePlaylistIds.json.map((id: number) =>
            getCacheKey({ __typename: 'Track', id }),
          ),
        detailedTrack: ({ detailedTrackId }, _, { getCacheKey }) =>
          getCacheKey({ __typename: 'Track', id: detailedTrackId }),
        selectedGenre: ({ currentGenreId }, _, { getCacheKey }) =>
          getCacheKey({ __typename: 'Genre', id: currentGenreId }),
        collection: (_, { id }, { getCacheKey }) =>
          getCacheKey({ __typename: 'Collection', id }),
        album: (_, { id }, { getCacheKey }) =>
          getCacheKey({ __typename: 'Album', id }),
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
