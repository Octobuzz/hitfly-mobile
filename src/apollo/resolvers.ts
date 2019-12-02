import L from 'lodash'
import { Platform, StatusBar } from 'react-native'
import { InMemoryCache, IdGetter } from 'apollo-cache-inmemory'
import ApolloClient, { Resolvers } from 'apollo-client'
import { HeaderSettings, HeaderMode } from './commonTypes'
import {
  GET_HEADER_SETTINGS,
  GET_ACTIVE_PLAYLIST,
  ActivePlaylistData,
} from './queries'
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
      const activeListdata = cache.readQuery<ActivePlaylistData>({
        query: GET_ACTIVE_PLAYLIST,
      })
      const activePlaylist = L.get(activeListdata, 'activePlaylist', [])
      const index = activePlaylist.findIndex(track => id === track.id)
      const data = {
        activeTrackId: id,
        isPlaying: true,
        canPlayNext: index !== -1 && index < activePlaylist.length - 1,
        canPlayPrev: index !== -1 && index > 0,
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
