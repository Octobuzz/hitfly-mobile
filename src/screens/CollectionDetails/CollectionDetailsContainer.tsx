import L from 'lodash'
import React, { useCallback } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import CollectionDetailsScreen from './CollectionDetails'
import {
  withChangingHeaderSettings,
  withSelectors,
  SelectorsProps,
} from 'src/containers/HOCs'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Pagination, Collection } from 'src/apollo'
import { ROUTES } from 'src/navigation'
import { helpers } from 'src/utils'

interface CollectionsData {
  collections?: Pagination<Collection>
}

const LIMIT = 10
const GET_COLLECTIONS = gql`
  query getCollectionsByType($type: String!, $limit: Int = ${LIMIT}, $page: Int = 1) {
    collectionDetailsType @client @export(as: "type")
    collections: collectionsByType(type: $type, limit: $limit, page: $page)
      @client
  }
`

interface Props extends SelectorsProps, NavigationStackScreenProps {}

const CollectionDetails: React.FC<Props> = ({
  navigation,
  selectGenre,
  selectCollection,
  selectCollectionType,
  ...rest
}) => {
  const { data, refetch, loading, fetchMore } = useQuery<CollectionsData>(
    GET_COLLECTIONS,
    { notifyOnNetworkStatusChange: true },
  )

  const collections: Collection[] = L.get(data, 'collections.items', [])
  const hasMorePages: boolean = L.get(data, 'collections.hasMorePages')

  const onEndReached = useCallback((): void => {
    if (hasMorePages && !loading) {
      // + 1, потому что для бэка 1 и 0 - одно и то же
      // поэтому page должна быть больше 1
      const page = Math.trunc(collections.length / LIMIT) + 1
      fetchMore({
        variables: { page, limit: LIMIT },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (fetchMoreResult) {
            return helpers.mergeRight(prev, fetchMoreResult)
          }
          return prev
        },
      })
    }
  }, [hasMorePages, collections, loading])

  const title = navigation.getParam('title', '')

  const onPressItem = useCallback(
    async (collection: Collection) => {
      await selectCollection(collection.id)
      navigation.navigate(ROUTES.MAIN.COLLECTION_PLAYLIST, {
        title,
      })
    },
    [title],
  )

  return (
    <CollectionDetailsScreen
      collections={collections}
      onRefresh={refetch}
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
