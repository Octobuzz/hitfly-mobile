import gql from 'graphql-tag'
import { Pagination, User } from 'src/apollo'

// FIXME: перенести в apollo/queries

export interface StarsData {
  users?: Pagination<User>
}

export const GET_STARS = gql`
  query {
    users(role: star, limit: 30, page: 1) {
      items: data {
        id
        userName: username
        avatar(sizes: [size_235x235]) {
          imageUrl: url
        }
      }
    }
  }
`
