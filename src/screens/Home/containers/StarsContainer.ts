import L from 'lodash'
import { Linking } from 'react-native'
import { graphql } from '@apollo/react-hoc'
import { StarsSection } from '../components'
import { GET_STARS, StarsData } from '../graphql'
import { withGraphQLRefetch } from 'src/containers/HOCs'
import { DOMAIN_URL } from 'src/constants/names'
import { User } from 'src/apollo'

const goToStarProfile = (user: User): void => {
  Linking.openURL(`${DOMAIN_URL}user/${user.id}`)
}

export default L.flowRight(
  // @ts-ignore
  graphql<StarsData>(GET_STARS, {
    alias: 'withStars',
    withRef: true,
    // @ts-ignore
    props: ({ data: { users, refetch, loading } }) => {
      const reqUsers = L.get(users, 'items', [])
      return {
        users: reqUsers,
        isLoading: loading,
        refetch,
        onPressStar: goToStarProfile,
      }
    },
  }),
  withGraphQLRefetch,
)(StarsSection)
