import L from 'lodash'
import React, { useCallback } from 'react'
import { NavigationEvents } from 'react-navigation'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import MyGenresScreen from './MyGenres'
import gql from 'graphql-tag'
import { Genre, Profile } from 'src/apollo'
import { useLazyQuery } from '@apollo/react-hooks'
import { ROUTES } from 'src/navigation'

interface GenreData {
  profile: Profile
}

interface Props extends NavigationStackScreenProps {}

const GET_GENRES = gql`
  query {
    profile: myProfile {
      favouriteGenres {
        id
        title: name
        imageUrl: image
        hasSubGenres: haveSubGenres
      }
    }
  }
`

const MyGenres: React.FC<Props> = ({ navigation }) => {
  const [getGenres, { data, refetch, loading, networkStatus }] = useLazyQuery<
    GenreData
  >(GET_GENRES, { fetchPolicy: 'cache-and-network' })

  const genres: Genre[] = L.get(data, 'profile.favouriteGenres', [])

  const onChange = useCallback(() => {
    navigation.navigate(ROUTES.MAIN.SELECT_GENRE)
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
