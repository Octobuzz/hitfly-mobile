import L from 'lodash'
import { withNavigation } from 'react-navigation'
import { graphql } from '@apollo/react-hoc'
import { TracksSection } from '../components'
import { GET_NEW_TRACKS } from './graphql'
import { withGraphQLRefetch } from 'src/containers/HOCs'
import { ROUTES } from 'src/navigation'

export default L.flowRight(
  withNavigation,
  // @ts-ignore
  graphql(GET_NEW_TRACKS, {
    alias: 'withNewTracks',
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
      const reqPlaylist = L.get(playlist, 'items', [])
      const onPressHeader = () => {
        navigation.navigate(ROUTES.MAIN.NEW_PLAYLIST)
      }
      // TODO: когда будет плеер, сделать HOC и прокинуть нужную функцию сюда
      const onPressTrack = () => {
        navigation.navigate(ROUTES.MAIN.NEW_PLAYLIST)
      }

      return {
        refetch,
        onPressTrack,
        onPressHeader,
        title: 'Новое',
        playlist: reqPlaylist,
        isLoading: loading,
      }
    },
  }),
  withGraphQLRefetch,
)(TracksSection)
