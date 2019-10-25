import L from 'lodash'
import { withNavigation } from 'react-navigation'
import { graphql } from '@apollo/react-hoc'
import { CollectionSection } from '../components'
import { GET_MUSIC_FAN } from '../graphql'
import { withGraphQLRefetch, withSelectors } from 'src/containers/HOCs'
import { ROUTES } from 'src/navigation'
import { Collection } from 'src/apollo'

export default L.flowRight(
  withNavigation,
  withSelectors,
  // @ts-ignore
  graphql(GET_MUSIC_FAN, {
    alias: 'withMusicFunCollections',
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
          title: 'Супер меломан',
        })
      }

      const onPressHeader = async () => {
        await selectCollectionType('musicFan')
        navigation.navigate(ROUTES.MAIN.COLLECTION_DETAILS, {
          title: 'Супер меломан',
          onPressItem: onPressCollection,
        })
      }

      return {
        refetch,
        title: 'Супер меломан 🔥',
        subtitle: '«Русская рулетка» треков',
        collections: reqCollections,
        isLoading: loading,
        onPressHeader,
        onPressCollection,
      }
    },
  }),
  withGraphQLRefetch,
)(CollectionSection)
