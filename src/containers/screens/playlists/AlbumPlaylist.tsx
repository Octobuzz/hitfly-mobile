import LFP from 'lodash/fp'
import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { useQuery } from '@apollo/react-hooks'
import NonCollectionPlaylist from './NonCollectionPlaylist'
import { Album, GET_ALBUM_TRACKS, Track, NoAvatarSizeNames } from 'src/apollo'
import { names } from 'src/constants'
import gql from 'graphql-tag'
import { useImageSource } from 'src/Hooks'

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

interface Props
  extends NavigationStackScreenProps<{
    trackToPlay?: Track
    title: string
  }> {}

const AlbumPlaylist: React.FC<Props> = props => {
  const { data } = useQuery<SelectedAlbumData>(GET_SELECTED_ALBUM)
  const id = LFP.get('album.id', data)
  const cover = LFP.getOr([], 'album.cover', data)
  const source = useImageSource(cover, NoAvatarSizeNames.S_300)
  return (
    <NonCollectionPlaylist
      hasMorePagesSelector={hasMorePagesSelector}
      itemsSelector={itemsSelector}
      query={GET_ALBUM_TRACKS}
      variables={{ albumId: id }}
      cover={source}
      playlistKey={`${names.PLAYLIST_KEYS.ALBUM}:${id}`}
      {...props}
    />
  )
}
export default AlbumPlaylist
