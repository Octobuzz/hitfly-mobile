import L from 'lodash'
import React, { useEffect } from 'react'
import SubGenresComponent from './SubGenres'
import gql from 'graphql-tag'
import { Genre, Pagination } from 'src/apollo'
import { useLazyQuery } from '@apollo/react-hooks'

interface GenreData {
  genres: Pagination<Genre>
}

interface Props {
  mainGenre: Genre
  allSelectedGenres: Record<number, boolean>
  isEditMode?: boolean // это костыль (?) из-за логики рендера поджанров
  onSubmit: (subGenres: Record<number, boolean>) => void
  onClose: () => void
}

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

const SubGenres: React.FC<Props> = props => {
  const [
    loadSubGenres,
    { data, loading, refetch, networkStatus },
  ] = useLazyQuery<GenreData>(GET_SUB_GENRES, {
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
      isLoading={loading}
      subGenres={subGenres}
      {...props}
    />
  )
}

export default SubGenres
