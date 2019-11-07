import L from 'lodash'
import React, { useCallback, useEffect } from 'react'
import { withNavigation } from 'react-navigation'
import { CollectionSection } from '../components'
import { withSelectors } from 'src/containers/HOCs'
import { Collection, GET_RECOMMENDED, CollectionsData } from 'src/apollo'
import { useQueryWithPagination } from 'src/containers/Hooks'
import { ROUTES } from 'src/navigation'

const LIMIT = 20
const itemsSelector = (data?: CollectionsData) =>
  L.get(data, 'collections.items', [])
const hasMorePagesSelector = (data?: CollectionsData) =>
  L.get(data, 'collections.hasMorePages', false)

const RecommendedContainer: React.FC<any> = ({
  navigation,
  getRefetcher,
  selectCollection,
  selectCollectionType,
}) => {
  const {
    items,
    refetch,
    networkStatus,
    onEndReached,
  } = useQueryWithPagination<CollectionsData>(GET_RECOMMENDED, {
    itemsSelector,
    hasMorePagesSelector,
    limit: LIMIT,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (getRefetcher) {
      getRefetcher(refetch)
    }
  }, [getRefetcher])

  const onPressHeader = useCallback(async () => {
    await selectCollectionType('recommended')
    navigation.navigate(ROUTES.MAIN.COLLECTION_DETAILS, {
      title: 'Рекомендуем',
    })
  }, [])

  const onPressCollection = useCallback(async (collection: Collection) => {
    await selectCollection(collection.id)
    navigation.navigate(ROUTES.MAIN.COLLECTION_PLAYLIST, {
      title: 'Рекомендуем',
    })
  }, [])

  const isLoading = networkStatus === 4 || networkStatus === 1

  return (
    <CollectionSection
      onPressCollection={onPressCollection}
      onPressHeader={onPressHeader}
      collections={items}
      isLoading={isLoading}
      isFetchingMore={networkStatus === 3}
      onEndReached={onEndReached}
      title="Рекомендуем"
      subtitle="Плейлисты, собранные специально для тебя"
    />
  )
}

export default L.flowRight(
  withSelectors,
  withNavigation,
)(RecommendedContainer)