import gql from 'graphql-tag'

export const COMMON_GENRE = gql`
  fragment CommonGenre on Genre {
    id
    title: name
    imageUrl: image
  }
`
