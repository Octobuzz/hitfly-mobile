import LFP from 'lodash/fp'
import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { useQuery } from '@apollo/react-hooks'
import NonCollectionPlaylist from './NonCollectionPlaylist'
import { Album, GET_ALBUM_TRACKS } from 'src/apollo'
import { names } from 'src/constants'
import gql from 'graphql-tag'

const GET_SELECTED_ALBUM = gql`
  query getSelectedAlbum($albumId: Int!) {
    currentAlbumId @client @export(as: "albumId")
    album(id: $albumId) {
      id
      cover(sizes: [size_235x235]) {
        imageUrl: url
      }
    }
  }
`
const hasMorePagesSelector = LFP.get('playlist.hasMorePages')
const itemsSelector = LFP.getOr([], 'playlist.items')

interface SelectedAlbumData {
  album?: Album
}

const AlbumPlaylist: React.FC<NavigationStackScreenProps> = props => {
  const { data } = useQuery<SelectedAlbumData>(GET_SELECTED_ALBUM)
  const id = LFP.get('album.id', data)
  const imageUrl = LFP.get('album.cover[0].imageUrl', data)
  let cover
  if (imageUrl) {
    cover = { uri: imageUrl }
  }
  return (
    <NonCollectionPlaylist
      hasMorePagesSelector={hasMorePagesSelector}
      itemsSelector={itemsSelector}
      query={GET_ALBUM_TRACKS}
      cover={cover}
      playlistKey={`${names.PLAYLIST_KEYS.ALBUM}:${id}`}
      {...props}
    />
  )
}
export default AlbumPlaylist
