import L from 'lodash'
import React, { useCallback } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import CollectionDetailsScreen from './CollectionDetails'
import { Pagination, Collection } from 'src/apollo'
import { routes, names } from 'src/constants'
import { useQueryWithPagination, useChangingHeaderSettings } from 'src/hooks'
import { DocumentNode } from 'graphql'

interface CollectionsData {
  collections?: Pagination<Collection>
}

interface Props extends NavigationStackScreenProps {
  query: DocumentNode
}

const itemsSelector = (data?: CollectionsData) =>
  L.get(data, 'collections.items', [])
const hasMorePagesSelector = (data?: CollectionsData) =>
  L.get(data, 'collections.hasMorePages', false)

const CollectionDetails: React.FC<Props> = ({ query, navigation, ...rest }) => {
  const {
    items,
    onEndReached,
    refetch,
    loading,
    networkStatus,
  } = useQueryWithPagination<CollectionsData>(query, {
    itemsSelector,
    hasMorePagesSelector,
    limit: names.DETAILED_LIMIT,
    notifyOnNetworkStatusChange: true,
  })

  useChangingHeaderSettings({ state: 'main', mode: 'dark' })

  const onPressItem = useCallback((collection: Collection) => {
    navigation.navigate(routes.MAIN.COLLECTION_PLAYLIST, {
      title: collection.title,
      collectionId: collection.id,
    })
  }, [])

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

export default CollectionDetails
