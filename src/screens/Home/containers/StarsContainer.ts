import L from 'lodash'
import { Linking } from 'react-native'
import { graphql } from '@apollo/react-hoc'
import { StarsSection } from '../components'
import { GET_STARS } from './graphql'
import { withGraphQLRefetch } from 'src/containers/HOCs'
import { DOMAIN_URL } from 'src/constants/names'
import { User } from 'src/apollo'

const goToStarProfile = (user: User): void => {
  Linking.openURL(`${DOMAIN_URL}user/${user.id}`)
}

export default L.flowRight(
  // @ts-ignore
  graphql(GET_STARS, {
    alias: 'withStars',
    // @ts-ignore
    props: ({ data: { users, refetch, loading } }) => {
      const reqUsers = L.get(users, 'items', [])
      return {
        refetch,
        users: reqUsers,
        isLoading: loading,
        onPressStar: goToStarProfile,
      }
    },
  }),
  withGraphQLRefetch,
)(StarsSection)
