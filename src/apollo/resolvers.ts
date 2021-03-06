import L from 'lodash'
import { InMemoryCache, IdGetter } from 'apollo-cache-inmemory'
import ApolloClient, { Resolvers } from 'apollo-client'
import { HeaderSettings } from './commonTypes'
import { GET_HEADER_SETTINGS } from './queries'
import { SetPlayerPropertiesVariables } from './mutations'

interface ContextArgs {
  client: ApolloClient<InMemoryCache>
  cache: InMemoryCache
  getCacheKey: IdGetter
}

export default {
  Mutation: {
    selectGenre: (_, { id }, { cache }: ContextArgs) => {
      cache.writeData({ data: { currentGenreId: id } })
      return null
    },
    selectDetailedTrack: (_, { id }, { cache }: ContextArgs) => {
      cache.writeData({ data: { detailedTrackId: id } })
      return null
    },
    setHeaderSettings: (
      _,
      { settings }: { settings: Partial<HeaderSettings> },
      { cache }: ContextArgs,
    ) => {
      const result = cache.readQuery<{ headerSettings: HeaderSettings }>({
        query: GET_HEADER_SETTINGS,
      })
      const newSettings = {
        ...L.get(result, 'headerSettings'),
        ...settings,
      }
      cache.writeData({ data: { headerSettings: newSettings } })
      return newSettings
    },
    setPlayerProperties: (
      _,
      vars: SetPlayerPropertiesVariables,
      { cache }: ContextArgs,
    ) => {
      const data: any = {}
      for (const prop in vars) {
        // @ts-ignore
        if (!L.isNil(vars[prop])) {
          // @ts-ignore
          data[prop] = vars[prop]
        }
      }
      cache.writeData({ data })
      return null
    },
    resetPlayer: (_, __, { cache }: ContextArgs) => {
      cache.writeData({
        data: {
          activePlaylist: [],
          activePlaylistKey: null,
          isPlaying: false,
          activeTrackId: null,
          canPlayNext: false,
          canPlayPrev: false,
        },
      })
      return null
    },
  },
} as Resolvers
