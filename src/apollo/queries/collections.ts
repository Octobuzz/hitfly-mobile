import { Pagination, Collection } from '../schemas'
import gql from 'graphql-tag'

export interface CollectionsData {
  collections?: Pagination<Collection>
}

export const GET_RECOMMENDED = gql`
  query Collections($limit: Int = 10, $page: Int = 1) {
    collections(limit: $limit, page: $page, filters: { collection: true }) {
      items: data {
        id
        image: image(sizes: [size_290x290]) {
          imageUrl: url
        }
        title
        tracksCountInPlaylist: tracksCount
      }
      hasMorePages: has_more_pages
    }
  }
`

export const GET_MUSIC_FAN = gql`
  query {
    collections(limit: 10, page: 1, filters: { superMusicFan: true }) {
      items: data {
        id
        image: image(sizes: [size_290x290]) {
          imageUrl: url
        }
        title
        tracksCountInPlaylist: tracksCount
      }
      hasMorePages: has_more_pages
    }
  }
`
