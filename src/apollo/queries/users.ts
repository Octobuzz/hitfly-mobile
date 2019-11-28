import { Pagination, User } from '../schemas'
import gql from 'graphql-tag'

export interface UsersData {
  users?: Pagination<User>
}

export const GET_STARS = gql`
  query Stars {
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
