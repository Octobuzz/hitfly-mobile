import L from 'lodash'
import LFP from 'lodash/fp'
import React from 'react'
import gql from 'graphql-tag'
import {
  withTrackToggle,
  withDetailedTrackMenu,
  withChangingHeaderSettings,
  ToggleTrackProps,
  DetailedTrackMenuProps,
} from 'src/HOCs'
import PlaylistScreen from 'src/screens/Playlist/Playlist'
import { Loader } from 'src/components'
import { useQueryWithPagination } from 'src/Hooks'
import { GET_COLLECTION_TRACKS } from 'src/apollo'
import { useQuery } from '@apollo/react-hooks'

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

const LIMIT = 500

interface Props extends ToggleTrackProps, DetailedTrackMenuProps {}

const hasMorePagesSelector = LFP.get('playlist.hasMorePages')
const itemsSelector = LFP.getOr([], 'playlist.items')

const CollectionPlaylist: React.FC<Props> = props => {
  const {
    items,
    refetch,
    onEndReached,
    networkStatus,
  } = useQueryWithPagination(GET_COLLECTION_TRACKS, {
    itemsSelector,
    hasMorePagesSelector,
    limit: LIMIT,
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  })

  const { data, loading } = useQuery(GET_CURRENT_COLLECTION)

  const uri = L.get(data, 'collection.image[0].imageUrl')
  const favouritesCount = L.get(data, 'collection.favouritesCount', 0)

  if (networkStatus === 1 || loading) {
    return <Loader isAbsolute />
  }

  return (
    <PlaylistScreen
      isRefreshing={networkStatus === 4}
      isFetchingMore={networkStatus === 3}
      onRefresh={refetch}
      onEndReached={onEndReached}
      cover={{ uri }}
      tracks={items}
      favouritesCount={favouritesCount}
      {...props}
    />
  )
}

export default L.flowRight(
  withChangingHeaderSettings({ state: 'main', mode: 'light' }),
  withDetailedTrackMenu,
  withTrackToggle,
)(CollectionPlaylist)
