import L from 'lodash'
import React, { useCallback } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import SelectGenreScreen from './SelectGenre'
import gql from 'graphql-tag'
import { Genre, Profile, Pagination } from 'src/apollo'
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import { ROUTES } from 'src/navigation'
import { helpers } from 'src/utils'

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

// limit = 1000 - костыль, ибо так произошло
// надеюсь, в будущем поменяется логика выбора поджанров
// сейчас все поджанры автоматически должны быть выбраны
// а значит они нужны все и сразу, но запрос только с пагинацией
const GET_SUB_GENRES = gql`
  query getSubGenres($limit: Int = 1000, $page: Int = 1, $rootGenreId: Int) {
    genres(limit: $limit, page: $page, rootGenreId: $rootGenreId) {
      items: data {
        id
        title: name
        imageUrl: image
      }
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

const SelectGenre: React.FC<Props> = ({
  isEditMode,
  navigation,
  favouriteGenres,
}) => {
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

  const [
    loadSubGenres,
    {
      data: subGenresData,
      loading: isSubGenresLoading,
      refetch: refetchSubGenres,
    },
  ] = useLazyQuery<GenreData>(GET_SUB_GENRES)

  const onSelectGenreWithSubGenres = useCallback(
    (genre: Genre): void => {
      loadSubGenres({ variables: { rootGenreId: genre.id } })
    },
    [loadSubGenres],
  )

  const subGenres = L.get(subGenresData, 'genres.items', [])

  return (
    <SelectGenreScreen
      isEditMode={isEditMode}
      subGenres={subGenres}
      genres={genres}
      isSubGenresLoading={isSubGenresLoading}
      onEndReached={onEndReached}
      isLoading={loading}
      onRefresh={refetch}
      onSubmit={onSubmit}
      onSkip={onSkip}
      isUpdating={isUpdating}
      refetchSubGenres={refetchSubGenres}
      onSelectGenreWithSubGenres={onSelectGenreWithSubGenres}
      favouriteGenres={favouriteGenres}
    />
  )
}

export default SelectGenre

export const SelectGenreForAuthScreen = (props: any) => (
  <SelectGenre
    {...props}
    skipRoute={ROUTES.APP.MAIN}
    submitRoute={ROUTES.APP.MAIN}
  />
)

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

  return (
    <SelectGenre
      {...props}
      isEditMode
      favouriteGenres={favouriteGenres}
      submitRoute={ROUTES.MAIN.MY_GENRES}
    />
  )
}
// TODO: рефактор
// 1) разделить модалку SubGenres от компонента SelectGenres
// 2) сделать кастомный хук для пагинации
// 3) вынести favouriteGenres в HOC?
