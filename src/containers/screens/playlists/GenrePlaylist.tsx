import LFP from 'lodash/fp'
import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { useQuery } from '@apollo/react-hooks'
import NonCollectionPlaylist from './NonCollectionPlaylist'
import { GET_GENRE_TRACKS } from 'src/apollo'
import { names } from 'src/constants'
import gql from 'graphql-tag'

const GET_SELECTED_GENRE = gql`
  query {
    genre: selectedGenre @client {
      id
      imageUrl: image
    }
  }
`

const hasMorePagesSelector = LFP.get('playlist.hasMorePages')
const itemsSelector = LFP.getOr([], 'playlist.items')

const GenrePlaylist: React.FC<NavigationStackScreenProps> = props => {
  const { data } = useQuery(GET_SELECTED_GENRE)
  const id = LFP.get('genre.id', data)
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
      playlistKey={`${names.PLAYLIST_KEYS.GENRE}:${id}`}
      {...props}
    />
  )
}
export default GenrePlaylist
