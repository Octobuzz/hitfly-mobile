import L from 'lodash'
import { withNavigation } from 'react-navigation'
import { graphql } from '@apollo/react-hoc'
import { TracksSection } from '../components'
import { GET_TOP_WEEK_TRACKS } from './graphql'
import { withGraphQLRefetch } from 'src/containers/HOCs'
import { ROUTES } from 'src/navigation'

export default L.flowRight(
  withNavigation,
  // @ts-ignore
  graphql(GET_TOP_WEEK_TRACKS, {
    alias: 'withTopWeekTracks',
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
        navigation.navigate(ROUTES.MAIN.TOP_WEEK_PLAYLIST)
      }
      // TODO: когда будет плеер, сделать HOC и прокинуть нужную функцию сюда
      const onPressTrack = () => {
        navigation.navigate(ROUTES.MAIN.TOP_WEEK_PLAYLIST)
      }

      return {
        refetch,
        onPressTrack,
        onPressHeader,
        isLoading: loading,
        playlist: reqPlaylist,
        title: 'Открытие недели',
        subtitle: 'Треки, которые неожиданно поднялись в чарте',
      }
    },
  }),
  withGraphQLRefetch,
)(TracksSection)
