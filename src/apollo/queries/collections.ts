import { Pagination, Collection } from '../schemas'
import { COMMON_COLLECTION } from '../fragments'
import gql from 'graphql-tag'

export interface GetCollectionForPlaylistData {
  collection: Pick<Collection, 'id' | 'image' | 'favouritesCount'>
}

export interface GetCollectionForPlaylistVariables {
  id: number
}

export const GET_COLLECTION_FOR_PLAYLIST = gql`
  query PlaylistCollection($id: Int!) {
    collection(id: $id) {
      id
      favouritesCount
      image(sizes: [size_300x300]) {
        imageUrl: url
      }
    }
  }
`

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
