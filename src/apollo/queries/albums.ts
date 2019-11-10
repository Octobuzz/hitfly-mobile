import gql from 'graphql-tag'

export const GET_MY_ALBUMS = gql`
  query getMyAlbums($limit: Int = 10, $page: Int = 1) {
    albums(limit: $limit, page: $page, filters: { my: true }) {
      items: data {
        id
        title
        author
        cover(sizes: [size_290x290]) {
          imageUrl: url
        }
        group: musicGroup {
          title: name
        }
      }
      hasMorePages: has_more_pages
    }
  }
`

export const GET_LIKED_ALBUMS = gql`
  query getLikedAlbums($limit: Int = 10, $page: Int = 1) {
    albums: favouriteAlbum(limit: $limit, page: $page) {
      items: data {
        id
        album {
          id
          title
          author
          cover(sizes: [size_290x290]) {
            imageUrl: url
          }
          group: musicGroup {
            title: name
          }
        }
      }
      hasMorePages: has_more_pages
    }
  }
`
