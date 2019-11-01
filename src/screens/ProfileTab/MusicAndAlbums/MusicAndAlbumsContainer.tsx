import React, { useState, useCallback } from 'react'
import { NavigationInjectedProps } from 'react-navigation'
import { graphql, MutateProps } from '@apollo/react-hoc'
import MusicAndAlbumsScreen from './MusicAndAlbums'
import { ToggleTrackProps, DetailedTrackMenuProps } from 'src/containers/HOCs'
import { Track, Album } from 'src/apollo'
import { Loader } from 'src/components'
import { ROUTES } from 'src/navigation'
import gql from 'graphql-tag'

interface Props
  extends ToggleTrackProps,
    DetailedTrackMenuProps,
    NavigationInjectedProps,
    MutateProps<void, { id: number }> {
  tracks: Track[]
  albums: Album[]
  isLoading: boolean
  refreshData: () => Promise<void>
}

const MusicAndAlbumsContainer: React.FC<Props> = ({
  isLoading,
  refreshData,
  navigation,
  mutate,
  ...rest
}) => {
  // FIXME: переделать через пропсы и networkStatus === 4
  const [isRefreshing, setRefreshing] = useState(false)

  const refresh = useCallback(async () => {
    try {
      setRefreshing(true)
      await refreshData()
    } catch {
      // добавлять ли что-то?
    } finally {
      setRefreshing(false)
    }
  }, [])

  const navigateToAlbumPlaylist = useCallback((album: Album): void => {
    mutate({ variables: { id: album.id } })
    navigation.navigate(ROUTES.MAIN.ALBUM_PLAYLIST)
  }, [])

  if (!isRefreshing && isLoading) {
    return <Loader isAbsolute />
  }

  return (
    <MusicAndAlbumsScreen
      tracksTitle="Любимые песни"
      albumTitle="Любимые альбомы"
      refreshing={isRefreshing}
      onPressAlbum={navigateToAlbumPlaylist}
      onRefresh={refresh}
      {...rest}
    />
  )
}

const SELECT_ALBUM = gql`
  mutation SelectAlbum($id: Int!) {
    selectAlbum(id: $id) @client
  }
`

// @ts-ignore
export default graphql(SELECT_ALBUM)(MusicAndAlbumsContainer)
