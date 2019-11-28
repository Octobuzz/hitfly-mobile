import gql from 'graphql-tag'
import { COMMON_ALBUM } from '../fragments'

export const GET_MY_ALBUMS = gql`
  query MyAlbums($limit: Int = 10, $page: Int = 1) {
    albums(limit: $limit, page: $page, filters: { my: true }) {
      items: data {
        ...CommonAlbum
      }
      hasMorePages: has_more_pages
    }
  }
  ${COMMON_ALBUM}
`

export const GET_LIKED_ALBUMS = gql`
  query LikedAlbums($limit: Int = 10, $page: Int = 1) {
    albums: favouriteAlbum(limit: $limit, page: $page) {
      items: data {
        id
        album {
          ...CommonAlbum
        }
      }
      hasMorePages: has_more_pages
    }
  }
  ${COMMON_ALBUM}
`
