import gql from 'graphql-tag'

export const COMMON_ALBUM = gql`
  fragment CommonAlbum on Album {
    id
    title
    author
    cover(sizes: [size_290x290]) {
      imageUrl: url
    }
  }
`
