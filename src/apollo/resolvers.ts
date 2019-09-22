import L from 'lodash'
import { InMemoryCache, IdGetter } from 'apollo-cache-inmemory'
import { Resolvers } from 'apollo-client'
import gql from 'graphql-tag'
import { Genre } from './schemas'

interface ContextArsg {
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

export default {
  Mutation: {
    selectCollection: (_, { id }, { cache }: ContextArsg) => {
      cache.writeData({ data: { currentCollectionId: id } })
      return null
    },
    selectGenre: (_, { id }, { cache }: ContextArsg) => {
      cache.writeData({ data: { currentGenreId: id } })
      return null
    },
  },
  Query: {
    genreById: (_, { genreId }, { cache }: ContextArsg) => {
      const resultGenres = cache.readQuery<{ genres?: Genre[] }>({
        query: GET_GENRES,
      })
      const genres = L.get(resultGenres, 'genres')
      if (genreId && genres) {
        return genres.find(({ id }) => id === genreId)
      }
      return null
    },
  },
} as Resolvers
