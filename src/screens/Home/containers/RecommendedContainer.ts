import L from 'lodash'
import { withNavigation } from 'react-navigation'
import { graphql } from '@apollo/react-hoc'
import { CollectionSection } from '../components'
import { GET_RECOMMENDED } from './graphql'
import { withGraphQLRefetch, withSelectors } from 'src/containers/HOCs'
import { ROUTES } from 'src/navigation'
import { Collection } from 'src/apollo'

export default L.flowRight(
  withNavigation,
  withSelectors,
  // @ts-ignore
  graphql(GET_RECOMMENDED, {
    alias: 'withRecommendedCollections',
    options: {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    },
    props: (
      {
        // @ts-ignore
        data: { collections, refetch, loading },
        // @ts-ignore
        ownProps: { navigation, selectCollection, selectCollectionType },
      },
      last,
    ) => {
      const reqCollections = L.get(collections, 'items', [])

      const onPressCollection = async (collection: Collection) => {
        await selectCollection(collection.id)
        navigation.navigate(ROUTES.MAIN.COLLECTION_PLAYLIST, {
          title: 'Рекомендуем',
        })
      }

      const onPressHeader = async () => {
        await selectCollectionType('recommended')
        navigation.navigate(ROUTES.MAIN.COLLECTION_DETAILS, {
          title: 'Рекомендуем',
        })
      }

      return {
        refetch,
        title: 'Рекомендуем',
        subtitle: 'Плейлисты, собранные специально для тебя',
        collections: reqCollections,
        isLoading: loading,
        onPressHeader,
        onPressCollection,
      }
    },
  }),
  withGraphQLRefetch,
)(CollectionSection)
