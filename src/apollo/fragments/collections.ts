import gql from 'graphql-tag'

export const COMMON_COLLECTION = gql`
  fragment CommonCollection on Collection {
    id
    image: image(sizes: [size_290x290]) {
      imageUrl: url
    }
    title
    tracksCountInPlaylist: tracksCount
  }
`
