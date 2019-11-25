import L from 'lodash'
import React, { useCallback, useEffect } from 'react'
import { withNavigation } from 'react-navigation'
import { GenresSection } from '../components'
import { DEPRECATED_GET_GENRES, GenreData, Genre } from 'src/apollo'
import { withSelectors } from 'src/HOCs'
import { routes } from 'src/constants'
import { useQuery } from '@apollo/react-hooks'

const GenresContainer: React.FC<any> = ({
  getRefetcher,
  navigation,
  selectGenre,
}) => {
  const { data, refetch, loading } = useQuery<GenreData>(
    DEPRECATED_GET_GENRES,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    },
  )

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

  const genres = L.get(data, 'genres', [])

  return (
    <GenresSection
      isLoading={loading}
      genres={genres}
      onPressHeader={onPressHeader}
      onPressItem={onPressItem}
    />
  )
}

export default L.flowRight(
  withNavigation,
  withSelectors,
)(GenresContainer)
