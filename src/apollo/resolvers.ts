import L from 'lodash'
import { Platform, StatusBar } from 'react-native'
import { InMemoryCache, IdGetter } from 'apollo-cache-inmemory'
import ApolloClient, { Resolvers } from 'apollo-client'
import { HeaderSettings, HeaderMode } from './commonTypes'
import { GET_HEADER_SETTINGS } from './queries'
import { Track } from './schemas'

interface ContextArgs {
  client: ApolloClient<InMemoryCache>
  cache: InMemoryCache
  getCacheKey: IdGetter
}

const setStatusBarColor = (mode: HeaderMode): void => {
  if (Platform.OS === 'ios') {
    StatusBar.setBarStyle(
      mode === 'dark' ? 'dark-content' : 'light-content',
      true,
    )
  }
}

export default {
  Mutation: {
    selectCollection: (_, { id }, { cache }: ContextArgs) => {
      cache.writeData({ data: { currentCollectionId: id } })
      return null
    },
    selectGenre: (_, { id }, { cache }: ContextArgs) => {
      cache.writeData({ data: { currentGenreId: id } })
      return null
    },
    selectAlbum: (_, { id }, { cache }: ContextArgs) => {
      cache.writeData({ data: { currentAlbumId: id } })
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
      if (newSettings.mode) {
        setStatusBarColor(newSettings.mode)
      }
      cache.writeData({ data: { headerSettings: newSettings } })
      return newSettings
    },
    setActiveTrackId: (_, { id }: { id: number }, { cache }: ContextArgs) => {
      const data = {
        activeTrackId: id,
        isPlaying: true,
      }
      cache.writeData({ data })
      return null
    },
    setIsPlaying: (
      _,
      { isPlaying }: { isPlaying: boolean },
      { cache }: ContextArgs,
    ) => {
      cache.writeData({ data: { isPlaying } })
      return null
    },
    setActivePlaylist: (
      _,
      { playlist, playlistKey }: { playlist: Track[]; playlistKey: string },
      { cache }: ContextArgs,
    ) => {
      cache.writeData({
        data: { activePlaylist: playlist, activePlaylistKey: playlistKey },
      })
      return playlist
    },
    resetPlayer: (_, __, { cache }: ContextArgs) => {
      cache.writeData({
        data: {
          playlist: [],
          activePlaylistKey: null,
          isPlaying: null,
          activeTrackId: null,
        },
      })
      return null
    },
  },
} as Resolvers
