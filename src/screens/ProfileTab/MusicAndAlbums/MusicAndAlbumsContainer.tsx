import L from 'lodash'
import React, { useCallback, useMemo } from 'react'
import { NavigationInjectedProps } from 'react-navigation'
import { useQuery } from '@apollo/react-hooks'
import MusicAndAlbumsScreen from './MusicAndAlbums'
import {
  withTrackToggle,
  ToggleTrackProps,
  withDetailedTrackMenu,
  DetailedTrackMenuProps,
} from 'src/HOCs'
import { Track, Album } from 'src/apollo'
import { Loader } from 'src/components'
import { routes } from 'src/constants'
import { DocumentNode } from 'graphql'

interface Props extends NavigationInjectedProps {
  playlistKey: string
  tracksTitle: string
  tracksQuery: DocumentNode
  trackTransformer?: (data?: any) => Track
  tracksSelector: (data: any) => Track[]
  albumTitle: string
  albumsQuery: DocumentNode
  albumTransformer?: (data?: any) => Album
  albumsSelector: (data: any) => Album[]
  onPressAlbumsHeader: () => void
  onPressTracksHeader: () => void
}

interface HOCsProps extends Props, ToggleTrackProps, DetailedTrackMenuProps {}

const MusicAndAlbumsContainer: React.FC<HOCsProps> = ({
  playlistKey,
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
    variables: {
      limit: 10,
    },
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
    variables: {
      limit: 4,
    },
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

  const navigateToAlbumPlaylist = useCallback((album: Album): void => {
    navigation.navigate(routes.PROFILE.ALBUM_PLAYLIST, {
      title: album.title,
      albumId: album.id,
    })
  }, [])

  if (isLoading) {
    return <Loader isAbsolute />
  }

  const paginatedPlaylistKey = `${playlistKey}:${tracks.length}`

  return (
    <MusicAndAlbumsScreen
      albums={albums}
      tracks={tracks}
      isRefreshing={isRefreshing}
      onPressAlbum={navigateToAlbumPlaylist}
      onRefresh={onResfresh}
      playlistKey={paginatedPlaylistKey}
      {...rest}
    />
  )
}

export default L.flowRight(
  withDetailedTrackMenu,
  withTrackToggle,
)(MusicAndAlbumsContainer) as React.FC<Props>
