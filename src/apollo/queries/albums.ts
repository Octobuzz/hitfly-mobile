import { Album } from '../schemas'
import { COMMON_ALBUM } from '../fragments'
import gql from 'graphql-tag'

export interface GetAlbumForPlaylistData {
  collection: Pick<Album, 'id' | 'cover'>
}

export interface GetAlbumForPlaylistVariables {
  id: number
}

export const GET_ALBUM_FOR_PLAYLIST = gql`
  query getSelectedAlbum($id: Int!) {
    album(id: $id) {
      id
      cover(sizes: [size_300x300]) {
        imageUrl: url
      }
    }
  }
`

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
