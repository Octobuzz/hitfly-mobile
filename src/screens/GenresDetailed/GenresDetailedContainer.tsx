import L from 'lodash'
import React, { useCallback } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import GenresDetailedScreen from './GenresDetailed'
import { Genre, GET_GENRES, GenreData } from 'src/apollo'
import { useQuery } from '@apollo/react-hooks'
import { routes } from 'src/constants'
import { withSelectors, SelectorsProps } from 'src/HOCs'

interface Props extends NavigationStackScreenProps, SelectorsProps {}

const MyGenres: React.FC<Props> = ({ navigation, selectGenre }) => {
  const { data, refetch, networkStatus } = useQuery<GenreData>(GET_GENRES, {
    fetchPolicy: 'cache-and-network',
  })

  const genres: Genre[] = L.get(data, 'genres', [])

  const onPressGenre = useCallback(async (genre: Genre) => {
    await selectGenre(genre.id)
    navigation.navigate(routes.MAIN.GENRE_PLAYLIST, { title: genre.title })
  }, [])

  return (
    <GenresDetailedScreen
      genres={genres}
      onRefresh={refetch}
      isLoading={networkStatus === 1}
      isRefreshing={networkStatus === 4}
      onPressGenre={onPressGenre}
    />
  )
}

// @ts-ignore
export default withSelectors(MyGenres)
