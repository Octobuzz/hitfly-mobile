import L from 'lodash'
import React, { useCallback } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import CollectionDetailsScreen from './CollectionDetails'
import {
  withChangingHeaderSettings,
  withSelectors,
  SelectorsProps,
} from 'src/HOCs'
import gql from 'graphql-tag'
import { Pagination, Collection } from 'src/apollo'
import { routes } from 'src/constants'
import { useQueryWithPagination } from 'src/Hooks'

interface CollectionsData {
  collections?: Pagination<Collection>
}

const LIMIT = 20
const GET_COLLECTIONS = gql`
  query getCollectionsByType($type: String!, $limit: Int = ${LIMIT}, $page: Int = 1) {
    collectionDetailsType @client @export(as: "type")
    collections: collectionsByType(type: $type, limit: $limit, page: $page)
      @client
  }
`

interface Props extends SelectorsProps, NavigationStackScreenProps {}

const itemsSelector = (data?: CollectionsData) =>
  L.get(data, 'collections.items', [])
const hasMorePagesSelector = (data?: CollectionsData) =>
  L.get(data, 'collections.hasMorePages', false)

const CollectionDetails: React.FC<Props> = ({
  navigation,
  selectGenre,
  selectCollection,
  selectCollectionType,
  ...rest
}) => {
  const {
    items,
    onEndReached,
    refetch,
    loading,
    networkStatus,
  } = useQueryWithPagination<CollectionsData>(GET_COLLECTIONS, {
    itemsSelector,
    hasMorePagesSelector,
    limit: LIMIT,
    notifyOnNetworkStatusChange: true,
  })

  const title = navigation.getParam('title', '')

  const onPressItem = useCallback(
    async (collection: Collection) => {
      await selectCollection(collection.id)
      navigation.navigate(routes.MAIN.COLLECTION_PLAYLIST, {
        title,
      })
    },
    [title],
  )

  return (
    <CollectionDetailsScreen
      collections={items}
      onRefresh={refetch}
      isRefreshing={networkStatus === 4}
      isLoading={loading}
      onPressItem={onPressItem}
      onEndReached={onEndReached}
      {...rest}
    />
  )
}

export default L.flowRight(
  withChangingHeaderSettings({ state: 'main', mode: 'dark' }),
  withSelectors,
)(CollectionDetails)
