import LFP from 'lodash/fp'
import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import NonCollectionPlaylist from './NonCollectionPlaylist'
import { GET_GENRE_TRACKS } from 'src/apollo'
import gql from 'graphql-tag'

const GET_SELECTED_GENRE = gql`
  query getSelectedGenre($genreId: Int!) {
    currentGenreId @client @export(as: "genreId")
    genre: genreById(genreId: $genreId) @client {
      imageUrl: image
    }
  }
`

const hasMorePagesSelector = LFP.get('playlist.hasMorePages')
const itemsSelector = LFP.getOr([], 'playlist.items')

const GenrePlaylist: React.FC = props => {
  const { data } = useQuery(GET_SELECTED_GENRE)
  const imageUrl = LFP.get('genre.imageUrl', data)
  let cover
  if (imageUrl) {
    cover = { uri: imageUrl }
  }
  return (
    <NonCollectionPlaylist
      hasMorePagesSelector={hasMorePagesSelector}
      itemsSelector={itemsSelector}
      query={GET_GENRE_TRACKS}
      cover={cover}
      {...props}
    />
  )
}
export default GenrePlaylist
