import L from 'lodash'
import { InMemoryCache, IdGetter } from 'apollo-cache-inmemory'
import ApolloClient, { Resolvers } from 'apollo-client'
import gql from 'graphql-tag'
import { Genre, Track } from './schemas'
import { HeaderSettings, CollectionsType } from './commonTypes'
import { helpers } from 'src/utils'

interface ContextArgs {
  client: ApolloClient<InMemoryCache>
  cache: InMemoryCache
  getCacheKey: IdGetter
}

const GET_GENRES = gql`
  query {
    genres: genre {
      id
      imageUrl: image
    }
  }
`

const GET_RECOMMENDED = gql`
  query Collections($limit: Int = 10, $page: Int = 1) {
    collections(limit: $limit, page: $page, filters: { collection: true }) {
      items: data {
        id
        image: image(sizes: [size_290x290]) {
          imageUrl: url
        }
        title
        tracksCountInPlaylist: tracksCount
      }
      hasMorePages: has_more_pages
    }
  }
`

// TODO: использовать фрагменты?
const GET_MUSIC_FAN = gql`
  query Collections($limit: Int = 10, $page: Int = 1) {
    collections(limit: $limit, page: $page, filters: { superMusicFan: true }) {
      items: data {
        id
        image: image(sizes: [size_290x290]) {
          imageUrl: url
        }
        title
        tracksCountInPlaylist: tracksCount
      }
      hasMorePages: has_more_pages
    }
  }
`

const GET_HEADER_SETTINGS = gql`
  query {
    headerSettings @client {
      mode
      state
    }
  }
`

export default {
  Mutation: {
    setCollectionsForDetails: (_, { type }, { cache }: ContextArgs) => {
      cache.writeData({ data: { collectionDetailsType: type } })
      return null
    },
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
        helpers.setStatusBarColor(newSettings.mode)
      }
      cache.writeData({ data: { headerSettings: newSettings } })
      return null
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
      { playlist }: { playlist: Track[] },
      { cache }: ContextArgs,
    ) => {
      cache.writeData({ data: { playlist } })
      return playlist
    },
  },
  Query: {
    genreById: (_, { genreId }, { cache }: ContextArgs) => {
      const resultGenres = cache.readQuery<{ genres?: Genre[] }>({
        query: GET_GENRES,
      })
      const genres = L.get(resultGenres, 'genres')
      if (genreId && genres) {
        return genres.find(({ id }) => id === genreId)
      }
      return null
    },
    collectionsByType: (
      _,
      { type, ...variables }: { type: CollectionsType },
      { client }: ContextArgs,
    ) => {
      if (!type) {
        return null
      }
      const query = type === 'recommended' ? GET_RECOMMENDED : GET_MUSIC_FAN
      return client
        .query({ query, variables })
        .then(res => L.get(res, 'data.collections'))
    },
  },
} as Resolvers
