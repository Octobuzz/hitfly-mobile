import L from 'lodash'
import LFP from 'lodash/fp'
import React, { useCallback } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import gql from 'graphql-tag'
import {
  withTrackToggle,
  withDetailedTrackMenu,
  withChangingHeaderSettings,
  ToggleTrackProps,
  DetailedTrackMenuProps,
} from 'src/HOCs'
import { useQuery } from '@apollo/react-hooks'
import PlaylistScreen from 'src/screens/Playlist/Playlist'
import { useQueryWithPagination } from 'src/Hooks'
import { GET_COLLECTION_TRACKS, Collection, Track } from 'src/apollo'
import { names } from 'src/constants'

const GET_CURRENT_COLLECTION = gql`
  query getCurrentCollection($collectionId: Int!) {
    currentCollectionId @client @export(as: "collectionId")
    collection(id: $collectionId) {
      id
      favouritesCount
      image(sizes: [size_290x290]) {
        imageUrl: url
      }
    }
  }
`

const LIMIT = 30

interface Props
  extends ToggleTrackProps,
    DetailedTrackMenuProps,
    NavigationStackScreenProps<{
      trackToPlay?: Track
      title: string
    }> {}

const hasMorePagesSelector = LFP.get('playlist.hasMorePages')
const itemsSelector = LFP.getOr([], 'playlist.items')

const CollectionPlaylist: React.FC<Props> = props => {
  const { data, refetch: refetchCollection } = useQuery<{
    collection: Collection
  }>(GET_CURRENT_COLLECTION, {
    fetchPolicy: 'cache-and-network',
  })

  const id = L.get(data, 'collection.id')
  const uri = L.get(data, 'collection.image[0].imageUrl')
  const favouritesCount = L.get(data, 'collection.favouritesCount', 0)

  const {
    items,
    onEndReached,
    networkStatus,
    refetch: refetchTracks,
  } = useQueryWithPagination(GET_COLLECTION_TRACKS, {
    itemsSelector,
    hasMorePagesSelector,
    variables: {
      collectionId: id,
    },
    limit: LIMIT,
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
      cover={{ uri }}
      tracks={items}
      favouritesCount={favouritesCount}
      playlistKey={`${names.PLAYLIST_KEYS.COLLECTION}:${id}:${items.length}`}
      {...props}
    />
  )
}

export default L.flowRight(
  withChangingHeaderSettings({ state: 'main', mode: 'light' }),
  withDetailedTrackMenu,
  withTrackToggle,
)(CollectionPlaylist)
