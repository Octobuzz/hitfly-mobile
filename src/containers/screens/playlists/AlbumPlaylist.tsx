import LFP from 'lodash/fp'
import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { useQuery } from '@apollo/react-hooks'
import NonCollectionPlaylist from './NonCollectionPlaylist'
import {
  GET_ALBUM_TRACKS,
  GET_ALBUM_FOR_PLAYLIST,
  Track,
  NoAvatarSizeNames,
  GetAlbumForPlaylistData,
  GetAlbumForPlaylistVariables,
} from 'src/apollo'
import { names } from 'src/constants'
import { useImageSource } from 'src/hooks'

const hasMorePagesSelector = LFP.get('playlist.hasMorePages')
const itemsSelector = LFP.getOr([], 'playlist.items')

interface Props
  extends NavigationStackScreenProps<{
    trackToPlay?: Track
    title: string
    albumId: number
  }> {}

const AlbumPlaylist: React.FC<Props> = props => {
  const albumId = props.navigation.getParam('albumId')
  const { data } = useQuery<
    GetAlbumForPlaylistData,
    GetAlbumForPlaylistVariables
  >(GET_ALBUM_FOR_PLAYLIST, { variables: { id: albumId } })

  const cover = LFP.getOr([], 'album.cover', data)
  const source = useImageSource(cover, NoAvatarSizeNames.S_300)

  return (
    <NonCollectionPlaylist
      hasMorePagesSelector={hasMorePagesSelector}
      itemsSelector={itemsSelector}
      query={GET_ALBUM_TRACKS}
      variables={{ albumId }}
      cover={source}
      playlistKey={`${names.PLAYLIST_KEYS.ALBUM}:${albumId}`}
      {...props}
    />
  )
}
export default AlbumPlaylist
