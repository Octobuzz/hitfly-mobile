import L from 'lodash'
import React, { useCallback } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import CollectionDetailsScreen from './CollectionDetails'
import {
  withChangingHeaderSettings,
  withSelectors,
  SelectorsProps,
} from 'src/HOCs'
import { Pagination, Collection } from 'src/apollo'
import { routes } from 'src/constants'
import { useQueryWithPagination } from 'src/Hooks'
import { DocumentNode } from 'graphql'

interface CollectionsData {
  collections?: Pagination<Collection>
}

const LIMIT = 30

interface Props extends SelectorsProps, NavigationStackScreenProps {
  query: DocumentNode
}

const itemsSelector = (data?: CollectionsData) =>
  L.get(data, 'collections.items', [])
const hasMorePagesSelector = (data?: CollectionsData) =>
  L.get(data, 'collections.hasMorePages', false)

const CollectionDetails: React.FC<Props> = ({
  query,
  navigation,
  selectGenre,
  selectCollection,
  ...rest
}) => {
  const {
    items,
    onEndReached,
    refetch,
    loading,
    networkStatus,
  } = useQueryWithPagination<CollectionsData>(query, {
    itemsSelector,
    hasMorePagesSelector,
    limit: LIMIT,
    notifyOnNetworkStatusChange: true,
  })

  const onPressItem = useCallback(async (collection: Collection) => {
    await selectCollection(collection.id)
    navigation.navigate(routes.MAIN.COLLECTION_PLAYLIST, {
      title: collection.title,
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

export default L.flowRight(
  withChangingHeaderSettings({ state: 'main', mode: 'dark' }),
  withSelectors,
)(CollectionDetails)
