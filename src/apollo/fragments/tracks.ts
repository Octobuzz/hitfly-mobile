import gql from 'graphql-tag'

export const COMMON_TRACK = gql`
  fragment CommonTrack on Track {
    id
    title: trackName
    cover(sizes: [size_290x290]) {
      imageUrl: url
    }
    fileUrl: filename
    singer
    length
    favouritesCount
    isFavorite: userFavourite
  }
`
