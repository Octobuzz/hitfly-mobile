import L from 'lodash'
import { withNavigation } from 'react-navigation'
import { graphql } from '@apollo/react-hoc'
import { PlaylistSection } from '../components'
import { GET_TOP50 } from './graphql'
import { withGraphQLRefetch } from 'src/containers/HOCs'
import { ROUTES } from 'src/navigation'
import { images } from 'src/constants'

export default L.flowRight(
  withNavigation,
  // @ts-ignore
  graphql(GET_TOP50, {
    alias: 'withTop50',
    props: (
      {
        // @ts-ignore
        data: { playlist, refetch, loading },
        // @ts-ignore
        ownProps: { navigation },
      },
      last,
    ) => {
      const reqPlaylist = L.get(playlist, 'items', [])
      const onPress = () => {
        navigation.navigate(ROUTES.MAIN.TOP_50_PLAYLIST)
      }
      return {
        refetch,
        onPress,
        title: 'Топ 50',
        subtitle: 'Рейтинг лучших музыкантов',
        imageSource: images.TOP50_BACKGROUND,
        bottomTextType: 'tracksLength',
        playlist: reqPlaylist,
        isLoading: loading,
      }
    },
  }),
  withGraphQLRefetch,
)(PlaylistSection)
