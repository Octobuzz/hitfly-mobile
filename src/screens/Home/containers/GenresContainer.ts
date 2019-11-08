import L from 'lodash'
import { withNavigation } from 'react-navigation'
import { graphql } from '@apollo/react-hoc'
import { GenresSection } from '../components'
import { GET_GENRES } from './graphql'
import { withGraphQLRefetch, withSelectors } from 'src/HOCs'
import { ROUTES } from 'src/navigation'
import { Genre } from 'src/apollo'

export default L.flowRight(
  withNavigation,
  withSelectors,
  // @ts-ignore
  graphql(GET_GENRES, {
    alias: 'withGenres',
    options: {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    },
    props: (
      {
        // @ts-ignore
        data: { genres = [], refetch, loading },
        // @ts-ignore
        ownProps: { navigation, selectGenre },
      },
      last,
    ) => {
      // TODO: сделать когда жанры будут готовы
      const onPressHeader = () => {
        // navigation.navigate(ROUTES.MAIN.NEW_PLAYLIST)
      }

      const onPressItem = async (genre: Genre) => {
        await selectGenre(genre.id)
        navigation.navigate(ROUTES.MAIN.GENRE_PLAYLIST, { title: genre.title })
      }

      return {
        genres,
        refetch,
        onPressItem,
        onPressHeader,
        isLoading: loading,
      }
    },
  }),
  withGraphQLRefetch,
)(GenresSection)
