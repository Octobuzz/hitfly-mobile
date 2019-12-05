import L from 'lodash'
import React, { useCallback, useEffect } from 'react'
import { withNavigation } from 'react-navigation'
import { CollectionSection } from '../components'
import { withSelectors } from 'src/HOCs'
import { routes, names } from 'src/constants'
import { Collection, GET_MUSIC_FAN, CollectionsData } from 'src/apollo'
import { useQueryWithPagination } from 'src/Hooks'

const itemsSelector = (data?: CollectionsData) =>
  L.get(data, 'collections.items', [])
const hasMorePagesSelector = (data?: CollectionsData) =>
  L.get(data, 'collections.hasMorePages', false)

const MusicFanContainer: React.FC<any> = ({
  navigation,
  getRefetcher,
  selectCollection,
}) => {
  const {
    items,
    refetch,
    networkStatus,
    onEndReached,
  } = useQueryWithPagination<CollectionsData>(GET_MUSIC_FAN, {
    itemsSelector,
    hasMorePagesSelector,
    limit: names.HOME_SECTION_LIMIT,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (getRefetcher) {
      getRefetcher(refetch)
    }
  }, [getRefetcher])

  const onPressHeader = useCallback(() => {
    navigation.navigate(routes.MAIN.MUSIC_FAN_DETAILS)
  }, [])

  const onPressCollection = useCallback(async (collection: Collection) => {
    await selectCollection(collection.id)
    navigation.navigate(routes.MAIN.COLLECTION_PLAYLIST, {
      title: collection.title,
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
      title="Супер меломан 🔥"
      subtitle="«Русская рулетка» треков"
    />
  )
}

export default L.flowRight(
  withSelectors,
  withNavigation,
)(MusicFanContainer)
