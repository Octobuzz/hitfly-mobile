import LFP from 'lodash/fp'
import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import NonCollectionPlaylist from './NonCollectionPlaylist'
import { Genre } from 'src/apollo/schemas'

// FIXME: тут чтото сделать с пагинацей:
// либо запросить все треки сразу
// либо добавить пагинацию в UI
const GET_GENRE_TRACKS = gql`
  query getCurrentGenreTracks($genreId: Int!) {
    currentGenreId @client @export(as: "genreId")
    playlist: tracks(limit: 1000, page: 0, filters: { genre: $genreId }) {
      items: data {
        id
        title: trackName
        group: musicGroup {
          title: name
        }
        singer
        fileUrl: filename
        cover(sizes: [size_290x290]) {
          imageUrl: url
        }
        length
        favouritesCount
      }
    }
  }
`

const GET_SELECTED_GENRE = gql`
  query getSelectedGenre($genreId: Int!) {
    currentGenreId @client @export(as: "genreId")
    genre: genreById(genreId: $genreId) @client {
      imageUrl: image
    }
  }
`

const hasMorePagesSelector = LFP.get('playlist.hasMorePagesSelector')
const itemsSelector = LFP.getOr([], 'playlist.items')

interface SelectedGenreData {
  genre?: Genre
}

const GenrePlaylist: React.FC = props => {
  const { data } = useQuery<SelectedGenreData>(GET_SELECTED_GENRE)
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
