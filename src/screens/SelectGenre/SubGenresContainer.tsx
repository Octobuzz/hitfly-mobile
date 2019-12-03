import L from 'lodash'
import React, { useEffect } from 'react'
import SubGenresComponent from './SubGenres'
import { Genre, GenresData, GET_SUB_GENRES } from 'src/apollo'
import { useLazyQuery } from '@apollo/react-hooks'

interface Props {
  mainGenre: Genre
  allSelectedGenres: Record<number, boolean>
  isEditMode?: boolean // это костыль (?) из-за логики рендера поджанров
  onSubmit: (subGenres: Record<number, boolean>) => void
  onClose: () => void
}

const SubGenres: React.FC<Props> = props => {
  const [loadSubGenres, { data, refetch, networkStatus }] = useLazyQuery<
    GenresData
  >(GET_SUB_GENRES, {
    notifyOnNetworkStatusChange: true,
  })

  const { mainGenre } = props
  useEffect(() => {
    if (mainGenre.hasSubGenres) {
      loadSubGenres({ variables: { rootGenreId: mainGenre.id } })
    }
  }, [mainGenre])

  const subGenres = L.get(data, 'genres.items', [])

  return (
    <SubGenresComponent
      onRefresh={refetch}
      isRefreshing={networkStatus === 4}
      isLoading={networkStatus === 1}
      subGenres={subGenres}
      {...props}
    />
  )
}

export default SubGenres
