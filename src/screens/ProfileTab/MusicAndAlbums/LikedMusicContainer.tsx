import L from 'lodash'
import React, { useCallback } from 'react'
import MusicAndAlbumsContainer from './MusicAndAlbumsContainer'
import gql from 'graphql-tag'

const LikedMusicContainer: React.FC = () => {
  const tracksSelector = useCallback(
    (data: any) => L.get(data, 'tracks.items', []),
    [],
  )

  const albumsSelector = useCallback(
    (data: any) => L.get(data, 'albums.items', []),
    [],
  )

  const trackTransformer = useCallback(({ track }) => track, [])
  const albumTransformer = useCallback(({ album }) => album, [])
  return (
    <MusicAndAlbumsContainer
      tracksTitle="Любимые песни"
      albumTitle="Альбомы"
      trackTransformer={trackTransformer}
      albumTransformer={albumTransformer}
      tracksQuery={GET_LIKED_MUSIC}
      albumsQuery={GET_LIKED_ALBUMS}
      tracksSelector={tracksSelector}
      albumsSelector={albumsSelector}
    />
  )
}

const GET_LIKED_MUSIC = gql`
  query {
    tracks: favouriteTrack(limit: 10, page: 1) {
      items: data {
        id
        track {
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
      }
      hasMorePages: has_more_pages
    }
  }
`
const GET_LIKED_ALBUMS = gql`
  query {
    albums: favouriteAlbum(limit: 4, page: 1) {
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

export default LikedMusicContainer
