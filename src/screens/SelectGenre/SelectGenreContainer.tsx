import L from 'lodash'
import React, { useCallback } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import SelectGenreScreen from './SelectGenre'
import gql from 'graphql-tag'
import { Genre, Pagination } from 'src/apollo'
import { useQuery } from '@apollo/react-hooks'
import { ROUTES } from 'src/navigation'
import { helpers } from 'src/utils'

interface GenreData {
  genres: Pagination<Genre>
}

interface Props extends NavigationStackScreenProps {}

const LIMIT = 20
const GET_GENRES = gql`
  query getGenres($limit: Int = ${LIMIT}, $page: Int = 1) {
    genres(limit: $limit, page: $page) {
      items: data {
        id
        title: name
        imageUrl: image
        hasSubGenres: haveSubGenres
      }
      hasMorePages: has_more_pages
    }
  }
`

const SelectGenre: React.FC<Props> = ({ navigation }) => {
  const { data, refetch, loading, fetchMore } = useQuery<GenreData>(
    GET_GENRES,
    { notifyOnNetworkStatusChange: true },
  )

  const genres: Genre[] = L.get(data, 'genres.items', [])
  const hasMorePages: boolean = L.get(data, 'genres.hasMorePages', false)
  const onEndReached = useCallback(() => {
    if (hasMorePages && !loading) {
      const page = Math.trunc(genres.length / LIMIT) + 1
      fetchMore({
        variables: { page, limit: LIMIT },
        // @ts-ignore
        updateQuery: (prev, { fetchMoreResult }) => {
          if (fetchMoreResult) {
            return helpers.mergeRight(prev, fetchMoreResult)
          }
          return prev
        },
      })
    }
  }, [hasMorePages, genres, loading])

  const onSkip = useCallback(() => {
    navigation.navigate(ROUTES.MAIN.HOME)
  }, [])

  const onSubmit = useCallback(() => {}, [])

  return (
    <SelectGenreScreen
      genres={genres}
      onEndReached={onEndReached}
      isLoading={loading}
      onRefresh={refetch}
      onSubmit={onSubmit}
      onSkip={onSkip}
    />
  )
}

export default SelectGenre
