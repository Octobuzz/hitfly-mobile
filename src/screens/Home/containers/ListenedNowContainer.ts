import L from 'lodash'
import { withNavigation } from 'react-navigation'
import { graphql } from '@apollo/react-hoc'
import { PlaylistSection } from '../components'
import { GET_LISTENED_NOW } from './graphql'
import { withGraphQLRefetch } from 'src/HOCs'
import { ROUTES } from 'src/navigation'
import { images } from 'src/constants'

export default L.flowRight(
  withNavigation,
  // @ts-ignore
  graphql(GET_LISTENED_NOW, {
    alias: 'withListenedNow',
    options: {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    },
    props: (
      {
        // @ts-ignore
        data: { playlist, refetch, loading },
        // @ts-ignore
        ownProps: { navigation },
      },
      last,
    ) => {
      const total = L.get(playlist, 'total', 0)
      const onPress = () => {
        navigation.navigate(ROUTES.MAIN.LISTENED_NOW_PLAYLIST)
      }
      return {
        refetch,
        onPress,
        isLoading: loading,
        tracksCount: total,
        title: 'Сейчас слушают',
        subtitle: 'Обновлен вчера', // TODO: это вычислять по дате?
        bottomTextType: 'tracksCount',
        imageSource: images.LISTENED_NOW,
      }
    },
  }),
  withGraphQLRefetch,
)(PlaylistSection)
