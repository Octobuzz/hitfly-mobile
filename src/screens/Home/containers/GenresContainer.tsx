import L from 'lodash'
import React, { useCallback, useEffect } from 'react'
import { withNavigation } from 'react-navigation'
import { GenresSection } from '../components'
import { GET_GENRES, GenresData, Genre } from 'src/apollo'
import { withSelectors } from 'src/HOCs'
import { useQueryWithPagination } from 'src/hooks'
import { routes, names } from 'src/constants'

const hasMorePagesSelector = (data?: GenresData) =>
  L.get(data, 'genres.hasMorePages')
const itemsSelector = (data?: GenresData) => L.get(data, 'genres.items', [])

const GenresContainer: React.FC<any> = ({
  getRefetcher,
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
    variables: { all: true },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    limit: names.HOME_SECTION_LIMIT,
  })

  useEffect(() => {
    if (getRefetcher) {
      getRefetcher(refetch)
    }
  }, [getRefetcher])

  const onPressHeader = useCallback(() => {
    navigation.navigate(routes.MAIN.GENRES_DETAILED)
  }, [])

  const onPressItem = useCallback(async (genre: Genre) => {
    await selectGenre(genre.id)
    navigation.navigate(routes.MAIN.GENRE_PLAYLIST, { title: genre.title })
  }, [])

  const isLoading = networkStatus === 1 || networkStatus === 4

  return (
    <GenresSection
      genres={items}
      isLoading={isLoading}
      isFetchingMore={networkStatus === 3}
      onEndReached={onEndReached}
      onPressHeader={onPressHeader}
      onPressItem={onPressItem}
    />
  )
}

export default L.flowRight(withNavigation, withSelectors)(GenresContainer)
