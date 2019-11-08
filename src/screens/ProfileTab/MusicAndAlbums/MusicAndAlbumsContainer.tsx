import L from 'lodash'
import React, { useCallback, useMemo } from 'react'
import { withNavigation, NavigationInjectedProps } from 'react-navigation'
import { useMutation, useQuery } from '@apollo/react-hooks'
import MusicAndAlbumsScreen from './MusicAndAlbums'
import {
  ToggleTrackProps,
  DetailedTrackMenuProps,
  withTrackToggle,
  withDetailedTrackMenu,
} from 'src/HOCs'
import { Track, Album } from 'src/apollo'
import { Loader } from 'src/components'
import { ROUTES } from 'src/navigation'
import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'

interface Props
  extends ToggleTrackProps,
    DetailedTrackMenuProps,
    NavigationInjectedProps {
  tracksTitle: string
  tracksQuery: DocumentNode
  trackTransformer?: (data?: any) => Track
  tracksSelector: (data: any) => Track[]
  albumTitle: string
  albumsQuery: DocumentNode
  albumTransformer?: (data?: any) => Album
  albumsSelector: (data: any) => Album[]
}

const MusicAndAlbumsContainer: React.FC<Props> = ({
  tracksQuery,
  trackTransformer,
  tracksSelector,
  albumsQuery,
  albumTransformer,
  albumsSelector,
  navigation,
  ...rest
}) => {
  const {
    data: tracksData,
    networkStatus: tracksNetworkStatus,
    refetch: tracksRefetch,
  } = useQuery(tracksQuery, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })
  const tracks = useMemo(() => {
    let tTracks = tracksSelector(tracksData)
    if (trackTransformer) {
      tTracks = tTracks.map(trackTransformer)
    }
    return tTracks
  }, [tracksData])

  const {
    data: albumsData,
    networkStatus: albumsNetworkStatus,
    refetch: albumsRefetch,
  } = useQuery(albumsQuery, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })
  const albums = useMemo(() => {
    let tAlbums = albumsSelector(albumsData)
    if (albumTransformer) {
      tAlbums = tAlbums.map(albumTransformer)
    }
    return tAlbums
  }, [albumsData])

  const isLoading = tracksNetworkStatus === 1 || albumsNetworkStatus === 1
  const isRefreshing = tracksNetworkStatus === 4 || albumsNetworkStatus === 4

  const onResfresh = useCallback(() => {
    tracksRefetch()
    albumsRefetch()
  }, [])

  const [selectAlbum] = useMutation(SELECT_ALBUM)

  const navigateToAlbumPlaylist = useCallback(async (album: Album): Promise<
    void
  > => {
    await selectAlbum({ variables: { id: album.id } })
    navigation.navigate(ROUTES.MAIN.ALBUM_PLAYLIST)
  }, [])

  if (isLoading) {
    return <Loader isAbsolute />
  }

  return (
    <MusicAndAlbumsScreen
      albums={albums}
      tracks={tracks}
      isRefreshing={isRefreshing}
      onPressAlbum={navigateToAlbumPlaylist}
      onRefresh={onResfresh}
      {...rest}
    />
  )
}

const SELECT_ALBUM = gql`
  mutation SelectAlbum($id: Int!) {
    selectAlbum(id: $id) @client
  }
`

export default L.flowRight(
  withDetailedTrackMenu,
  withTrackToggle,
  withNavigation,
)(MusicAndAlbumsContainer)
