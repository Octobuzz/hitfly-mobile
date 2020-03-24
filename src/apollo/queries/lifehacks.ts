import { Lifehack, Pagination } from '../schemas'
import { COMMON_LIFEHACK } from '../fragments'
import gql from 'graphql-tag'

export interface LifehacksData {
  lifehacks: Pagination<Lifehack>
}

export const GET_LIFEHACKS = gql`
  query Lifehacks($limit: Int = 20, $page: Int = 1) {
    lifehack(limit: $limit, page: $page) {
      items: data {
        ...CommonLifehack
      }
      hasMorePages: has_more_pages
    }
  }
  ${COMMON_LIFEHACK}
`

export const GET_LIKED_LIFEHACKS = gql`
  query LikedLifehack($limit: Int = 20, $page: Int = 1) {
    favouriteLifehack(limit: $limit, page: $page) {
      items: data {
        ...CommonLifehack
      }
      hasMorePages: has_more_pages
    }
  }
  ${COMMON_LIFEHACK}
`
