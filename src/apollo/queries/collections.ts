import { Pagination, Collection } from '../schemas'
import { COMMON_COLLECTION } from '../fragments'
import gql from 'graphql-tag'

export interface CollectionsData {
  collections?: Pagination<Collection>
}

export const GET_RECOMMENDED = gql`
  query RecommendedCollections($limit: Int = 10, $page: Int = 1) {
    collections(limit: $limit, page: $page, filters: { collection: true }) {
      items: data {
        ...CommonCollection
      }
      hasMorePages: has_more_pages
    }
  }
  ${COMMON_COLLECTION}
`

export const GET_MUSIC_FAN = gql`
  query MusicFanCollections($limit: Int = 10, $page: Int = 1) {
    collections(limit: $limit, page: $page, filters: { superMusicFan: true }) {
      items: data {
        ...CommonCollection
      }
      hasMorePages: has_more_pages
    }
  }
  ${COMMON_COLLECTION}
`
