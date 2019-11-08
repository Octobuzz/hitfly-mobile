import L from 'lodash'
import React, { useCallback } from 'react'
import { NavigationInjectedProps } from 'react-navigation'
import MusicAndAlbumsContainer from './MusicAndAlbumsContainer'
import gql from 'graphql-tag'

interface Props extends NavigationInjectedProps {}

const MyMusicContainer: React.FC<Props> = props => {
  const tracksSelector = useCallback(
    (data: any) => L.get(data, 'tracks.items', []),
    [],
  )

  const albumsSelector = useCallback(
    (data: any) => L.get(data, 'albums.items', []),
    [],
  )

  return (
    <MusicAndAlbumsContainer
      tracksQuery={GET_MY_MUSIC}
      albumsQuery={GET_MY_ALBUMS}
      tracksSelector={tracksSelector}
      albumsSelector={albumsSelector}
      tracksTitle="Песни"
      albumTitle="Альбомы"
      {...props}
    />
  )
}

const GET_MY_MUSIC = gql`
  query {
    tracks(limit: 10, page: 1, filters: { my: true }) {
      items: data {
        id
        title: trackName
        group: musicGroup {
          title: name
        }
        singer
        fileUrl: filename
        cover(sizes: [size_290x290]) {
          imageUrl: url
        }
        length
      }
      hasMorePages: has_more_pages
    }
  }
`
const GET_MY_ALBUMS = gql`
  query {
    albums(limit: 4, page: 1, filters: { my: true }) {
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

export default MyMusicContainer
