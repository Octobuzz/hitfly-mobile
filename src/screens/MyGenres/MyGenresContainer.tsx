import L from 'lodash'
import React, { useCallback } from 'react'
import { NavigationEvents } from 'react-navigation'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import MyGenresScreen from './MyGenres'
import { Genre, FavoriteGenresData, GET_FAVORITE_GENRES } from 'src/apollo'
import { useLazyQuery } from '@apollo/react-hooks'
import { routes } from 'src/constants'

interface Props extends NavigationStackScreenProps {}

const MyGenres: React.FC<Props> = ({ navigation }) => {
  const [getGenres, { data, refetch, loading, networkStatus }] = useLazyQuery<
    FavoriteGenresData
  >(GET_FAVORITE_GENRES, { fetchPolicy: 'cache-and-network' })

  const genres: Genre[] = L.get(data, 'profile.favouriteGenres', [])

  const onChange = useCallback(() => {
    navigation.navigate(routes.MAIN.SELECT_GENRE)
  }, [])

  const handleFocus = useCallback(() => {
    getGenres()
  }, [])

  return (
    <>
      <NavigationEvents onDidFocus={handleFocus} />
      <MyGenresScreen
        genres={genres}
        isLoading={loading}
        onRefresh={refetch}
        isRefreshing={networkStatus === 4}
        onPressChange={onChange}
      />
    </>
  )
}

export default MyGenres
