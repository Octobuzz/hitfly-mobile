import L from 'lodash'
import React, { useMemo } from 'react'
import gql from 'graphql-tag'
import { DataValue, graphql } from '@apollo/react-hoc'
import { Pagination, FavouriteAlbum, FavouriteTrack } from 'src/apollo'
import LikedMusicScreen from './LikedMusic'
import {
  withTrackToggle,
  ToggleTrackProps,
  DetailedTrackMenuProps,
} from 'src/containers/HOCs'
import { Loader } from 'src/components'

interface Props extends ToggleTrackProps, DetailedTrackMenuProps {
  tracksData: DataValue<{ tracksPagination: Pagination<FavouriteTrack> }>
  albumsData: DataValue<{ albumsPagination: Pagination<FavouriteAlbum> }>
}

const LikedMusicContainer: React.FC<Props> = ({
  tracksData: { tracksPagination, loading: tracksLoading },
  albumsData: { albumsPagination, loading: albumsLoading },
  ...rest
}) => {
  if (tracksLoading || albumsLoading) {
    return <Loader isAbsolute />
  }
  const favouriteTracks: FavouriteTrack[] = L.get(tracksPagination, 'items', [])
  const normalTracks = useMemo(
    () => favouriteTracks.map(({ track }) => track),
    [favouriteTracks],
  )

  const favouriteAlbums: FavouriteAlbum[] = L.get(albumsPagination, 'items', [])

  const normalAlbums = useMemo(
    () => favouriteAlbums.map(({ album }) => album),
    [favouriteAlbums],
  )

  return (
    <LikedMusicScreen albums={normalAlbums} tracks={normalTracks} {...rest} />
  )
}

// FIXME: потом заделать пагинацию нормально
// FIXME: сделать через фрагменты
const GET_LIKED_MUSIC = gql`
  query {
    tracksPagination: favouriteTrack(limit: 1000, page: 1) {
      items: data {
        id
        track {
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
        }
      }
    }
  }
`
const GET_LIKED_ALBUMS = gql`
  query {
    albumsPagination: favouriteAlbum(limit: 1000, page: 1) {
      items: data {
        id
        album {
          id
          title
          author
          cover(sizes: [size_290x290]) {
            imageUrl: url
          }
          group: musicGroup {
            title: name
          }
        }
      }
    }
  }
`

export default L.flowRight(
  graphql<Props>(GET_LIKED_MUSIC, { name: 'tracksData' }),
  graphql<Props>(GET_LIKED_ALBUMS, { name: 'albumsData' }),
  withTrackToggle,
)(LikedMusicContainer)
