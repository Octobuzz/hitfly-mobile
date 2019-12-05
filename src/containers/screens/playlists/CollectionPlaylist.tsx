import L from 'lodash'
import LFP from 'lodash/fp'
import React, { useCallback } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import {
  withTrackToggle,
  withDetailedTrackMenu,
  withChangingHeaderSettings,
  ToggleTrackProps,
  DetailedTrackMenuProps,
} from 'src/HOCs'
import { useQuery } from '@apollo/react-hooks'
import PlaylistScreen from 'src/screens/Playlist/Playlist'
import { useQueryWithPagination, useImageSource } from 'src/Hooks'
import {
  Track,
  NoAvatarSizeNames,
  GetCollectionForPlaylistData,
  GetCollectionForPlaylistVariables,
  GET_COLLECTION_FOR_PLAYLIST,
  GET_COLLECTION_TRACKS,
} from 'src/apollo'
import { names } from 'src/constants'

interface Props
  extends ToggleTrackProps,
    DetailedTrackMenuProps,
    NavigationStackScreenProps<{
      trackToPlay?: Track
      collectionId: number
      title: string
    }> {}

const hasMorePagesSelector = LFP.get('playlist.hasMorePages')
const itemsSelector = LFP.getOr([], 'playlist.items')

const CollectionPlaylist: React.FC<Props> = props => {
  const collectionId = props.navigation.getParam('collectionId')

  const { data, refetch: refetchCollection } = useQuery<
    GetCollectionForPlaylistData,
    GetCollectionForPlaylistVariables
  >(GET_COLLECTION_FOR_PLAYLIST, {
    variables: {
      id: collectionId,
    },
    fetchPolicy: 'cache-and-network',
  })

  const image = L.get(data, 'collection.image', [])
  const favouritesCount = L.get(data, 'collection.favouritesCount', 0)

  const source = useImageSource(image, NoAvatarSizeNames.S_300)

  const {
    items,
    onEndReached,
    networkStatus,
    refetch: refetchTracks,
  } = useQueryWithPagination(GET_COLLECTION_TRACKS, {
    itemsSelector,
    hasMorePagesSelector,
    variables: {
      collectionId,
    },
    limit: names.PLAYLIST_LIMIT,
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  })

  const onRefresh = useCallback(() => {
    refetchTracks()
    refetchCollection()
  }, [])

  return (
    <PlaylistScreen
      isLoading={networkStatus === 1}
      isRefreshing={networkStatus === 4}
      isFetchingMore={networkStatus === 3}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      cover={source}
      tracks={items}
      favouritesCount={favouritesCount}
      playlistKey={`${names.PLAYLIST_KEYS.COLLECTION}:${collectionId}:${items.length}`}
      {...props}
    />
  )
}

export default L.flowRight(
  withChangingHeaderSettings({ state: 'main', mode: 'light' }),
  withDetailedTrackMenu,
  withTrackToggle,
)(CollectionPlaylist)
