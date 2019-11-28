import L from 'lodash'
import React, { useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { Genre, FavoriteGenresData, GET_FAVORITE_GENRES } from 'src/apollo'
import MyGenresScreen from './MyGenres'
import { routes } from 'src/constants'

interface Props extends NavigationStackScreenProps {}

const MyGenres: React.FC<Props> = ({ navigation }) => {
  const { data, refetch, loading, networkStatus } = useQuery<
    FavoriteGenresData
  >(GET_FAVORITE_GENRES, { fetchPolicy: 'cache-and-network' })

  const genres: Genre[] = L.get(data, 'profile.favouriteGenres', [])

  const onChange = useCallback(() => {
    navigation.navigate(routes.MAIN.SELECT_GENRE)
  }, [])

  return (
    <MyGenresScreen
      genres={genres}
      isLoading={loading}
      onRefresh={refetch}
      isRefreshing={networkStatus === 4}
      onPressChange={onChange}
    />
  )
}

export default MyGenres
