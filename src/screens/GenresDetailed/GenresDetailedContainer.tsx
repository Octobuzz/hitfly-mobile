import L from 'lodash'
import React, { useCallback } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import GenresDetailedScreen from './GenresDetailed'
import { Genre, GET_GENRES, GenresData } from 'src/apollo'
import { withSelectors, SelectorsProps } from 'src/HOCs'
import { useQueryWithPagination } from 'src/Hooks'
import { routes } from 'src/constants'

const LIMIT = 30

const hasMorePagesSelector = (data?: GenresData) =>
  L.get(data, 'genres.hasMorePages')
const itemsSelector = (data?: GenresData) => L.get(data, 'genres.items', [])

interface Props extends NavigationStackScreenProps, SelectorsProps {}

const GenresDetailedContainer: React.FC<Props> = ({
  navigation,
  selectGenre,
}) => {
  const {
    items,
    refetch,
    onEndReached,
    networkStatus,
  } = useQueryWithPagination<GenresData>(GET_GENRES, {
    itemsSelector,
    hasMorePagesSelector,
    limit: LIMIT,
    variables: {
      all: true,
    },
    fetchPolicy: 'cache-and-network',
  })

  const onPressGenre = useCallback(async (genre: Genre) => {
    await selectGenre(genre.id)
    navigation.navigate(routes.MAIN.GENRE_PLAYLIST, { title: genre.title })
  }, [])

  return (
    <GenresDetailedScreen
      genres={items}
      onRefresh={refetch}
      onEndReached={onEndReached}
      isFetchingMore={networkStatus === 3}
      isLoading={networkStatus === 1}
      isRefreshing={networkStatus === 4}
      onPressGenre={onPressGenre}
    />
  )
}

export default withSelectors(GenresDetailedContainer)
