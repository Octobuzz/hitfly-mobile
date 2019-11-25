import L from 'lodash'
import React from 'react'
import { FavoriteGenresData, GET_FAVORITE_GENRES } from 'src/apollo'
import SelectGenre from './SelectGenreContainer'
import { useQuery } from '@apollo/react-hooks'

const SelectGenreForProfileScreen: React.FC<any> = props => {
  const { data } = useQuery<FavoriteGenresData>(GET_FAVORITE_GENRES)

  const favouriteGenres = L.get(data, 'profile.favouriteGenres', [])

  return <SelectGenre {...props} isEditMode favouriteGenres={favouriteGenres} />
}

export default SelectGenreForProfileScreen
