import L from 'lodash'
import React, { useCallback } from 'react'
import { withNavigation, NavigationInjectedProps } from 'react-navigation'
import gql from 'graphql-tag'
import { DataValue, graphql } from '@apollo/react-hoc'
import { Pagination, FavouriteAlbum, FavouriteTrack } from 'src/apollo'
import MusicAndAlbumsContainer from './MusicAndAlbumsContainer'
import {
  withTrackToggle,
  ToggleTrackProps,
  DetailedTrackMenuProps,
} from 'src/containers/HOCs'

interface Props
  extends ToggleTrackProps,
    DetailedTrackMenuProps,
    NavigationInjectedProps {
  tracksData: DataValue<{ tracks: Pagination<FavouriteTrack> }>
  albumsData: DataValue<{ albums: Pagination<FavouriteAlbum> }>
}

const MyMusicContainer: React.FC<Props> = ({
  tracksData: { tracks, loading: tracksLoading, refetch: refretchTracks },
  albumsData: { albums, loading: albumsLoading, refetch: refretchAlbums },
  ...rest
}) => {
  const favouriteTracks: FavouriteTrack[] = L.get(tracks, 'items', [])
  const favouriteAlbums: FavouriteAlbum[] = L.get(albums, 'items', [])

  const refreshData = useCallback(
    (): Promise<any> => Promise.all([refretchTracks(), refretchAlbums()]),
    [],
  )

  return (
    <MusicAndAlbumsContainer
      albums={favouriteTracks}
      tracks={favouriteAlbums}
      isLoading={tracksLoading || albumsLoading}
      refreshData={refreshData}
      {...rest}
    />
  )
}

// FIXME: потом заделать пагинацию нормально
// FIXME: сделать через фрагменты
const GET_MY_MUSIC = gql`
  query {
    tracks(limit: 1000, page: 1, filters: { my: true }) {
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
      }
    }
  }
`
const GET_MY_ALBUMS = gql`
  query {
    albums(limit: 1000, page: 1, filters: { my: true }) {
      items: data {
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
`

export default L.flowRight(
  graphql<Props>(GET_MY_MUSIC, { name: 'tracksData' }),
  graphql<Props>(GET_MY_ALBUMS, { name: 'albumsData' }),
  withTrackToggle,
  withNavigation,
)(MyMusicContainer)
