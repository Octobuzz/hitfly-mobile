import { Pagination, User } from '../schemas'
import gql from 'graphql-tag'
import { USER_AVATAR } from '../fragments'

export interface UsersData {
  users?: Pagination<User>
}

export const GET_STARS = gql`
  query Stars {
    users(role: star, limit: 30, page: 1) {
      items: data {
        id
        userName: username
        ...UserAvatar
      }
    }
  }
  ${USER_AVATAR}
`
