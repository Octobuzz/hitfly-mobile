import L from 'lodash'
import React, { useCallback } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import SelectGenreScreen from './SelectGenre'
import gql from 'graphql-tag'
import { Genre, Profile, Pagination } from 'src/apollo'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { ROUTES } from 'src/navigation'
import { useQueryWithPagination } from 'src/containers/Hooks'

interface GenreData {
  genres: Pagination<Genre>
}

interface Props extends NavigationStackScreenProps {
  isEditMode?: boolean
  favouriteGenres?: Genre[]
}

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

// тут баг с бэка, параметр username обязателен
// однако если передать пустую строку - будет пустая строка (перезапишет)
// А НАХЕР МНЕ ВООБЩЕ ЭТОТ ЮЗЕР НЕЙМ? Я ЖАНРЫ ДОБАВЛЯЮ
const UPDATE_GENRES = gql`
  mutation updateGenres($genresIds: [ID]) {
    updateMyProfile(profile: { genres: $genresIds, username: "" }) {
      __typename
    }
  }
`

const genresSelector = (data?: GenreData) => L.get(data, 'genres.items', [])
const hasMorePagesSelector = (data?: GenreData) =>
  L.get(data, 'genres.hasMorePages', false)

const SelectGenre: React.FC<Props> = ({
  isEditMode,
  navigation,
  favouriteGenres,
}) => {
  const {
    items,
    refetch,
    loading,
    networkStatus,
    onEndReached,
  } = useQueryWithPagination<GenreData>(GET_GENRES, {
    hasMorePagesSelector,
    limit: LIMIT,
    itemsSelector: genresSelector,
    notifyOnNetworkStatusChange: true,
  })

  const onSkip = useCallback(() => {
    navigation.navigate(ROUTES.APP.MAIN)
  }, [isEditMode])

  const [updateGenres, { loading: isUpdating }] = useMutation<
    Profile,
    { genresIds: string[] }
  >(UPDATE_GENRES)

  const onSubmit = useCallback(
    async (selectedGenresIds: string[]): Promise<void> => {
      try {
        await updateGenres({ variables: { genresIds: selectedGenresIds } })
        const submitRoute = isEditMode ? ROUTES.MAIN.MY_GENRES : ROUTES.APP.MAIN
        navigation.navigate(submitRoute)
      } catch (e) {
        // TODO: добавить обработчик
      }
    },
    [isEditMode],
  )

  return (
    <SelectGenreScreen
      isEditMode={isEditMode}
      isRefreshing={networkStatus === 4}
      genres={items}
      onEndReached={onEndReached}
      isLoading={loading}
      onRefresh={refetch}
      onSubmit={onSubmit}
      onSkip={onSkip}
      isUpdating={isUpdating}
      favouriteGenres={favouriteGenres}
    />
  )
}

export default SelectGenre

interface ProfileGenres {
  profile: Profile
}

const GET_FAVOURITE_GENRES = gql`
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

export const SelectGenreForProfileScreen: React.FC<any> = props => {
  const { data } = useQuery<ProfileGenres>(GET_FAVOURITE_GENRES)

  const favouriteGenres = L.get(data, 'profile.favouriteGenres', [])

  return <SelectGenre {...props} isEditMode favouriteGenres={favouriteGenres} />
}
