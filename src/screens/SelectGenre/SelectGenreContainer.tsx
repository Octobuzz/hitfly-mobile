import L from 'lodash'
import React, { useCallback } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { useMutation } from '@apollo/react-hooks'
import { routes } from 'src/constants'
import SelectGenreScreen from './SelectGenre'
import { useQueryWithPagination } from 'src/Hooks'
import {
  Genre,
  GenresData,
  FavoriteGenresData,
  UpdateGenresVariables,
  GET_GENRES,
  UPDATE_GENRES,
} from 'src/apollo'

interface Props extends NavigationStackScreenProps {
  isEditMode?: boolean
  favouriteGenres?: Genre[]
}

const LIMIT = 20

const itemsSelector = (data?: GenresData) => L.get(data, 'genres.items', [])
const hasMorePagesSelector = (data?: GenresData) =>
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
  } = useQueryWithPagination<GenresData>(GET_GENRES, {
    itemsSelector,
    hasMorePagesSelector,
    limit: LIMIT,
    notifyOnNetworkStatusChange: true,
  })

  const onSkip = useCallback(() => {
    navigation.navigate(routes.APP.MAIN)
  }, [isEditMode])

  const [updateGenres, { loading: isUpdating }] = useMutation<
    FavoriteGenresData,
    UpdateGenresVariables
  >(UPDATE_GENRES)

  const onSubmit = useCallback(
    async (selectedGenresIds: string[]): Promise<void> => {
      try {
        await updateGenres({ variables: { genresIds: selectedGenresIds } })
        const submitRoute = isEditMode ? routes.MAIN.MY_GENRES : routes.APP.MAIN
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
