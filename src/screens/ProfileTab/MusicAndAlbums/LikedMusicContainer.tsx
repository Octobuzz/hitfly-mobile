import LFP from 'lodash/fp'
import React, { useCallback } from 'react'
import { withNavigation, NavigationInjectedProps } from 'react-navigation'
import MusicAndAlbumsContainer from './MusicAndAlbumsContainer'
import { GET_LIKED_ALBUMS } from 'src/apollo'
import gql from 'graphql-tag'
import { ROUTES } from 'src/navigation'

interface Props extends NavigationInjectedProps {}

const albumsSelector = LFP.getOr([], 'albums.items')
const tracksSelector = LFP.getOr([], 'tracks.items')
const albumTransformer = LFP.get('album')
const trackTransformer = LFP.get('track')

const LikedMusicContainer: React.FC<Props> = props => {
  const onPressAlbumsHeader = useCallback(() => {
    props.navigation.navigate(ROUTES.MAIN.LIKED_ALBUMS_DETAILED)
  }, [])

  return (
    <MusicAndAlbumsContainer
      onPressAlbumsHeader={onPressAlbumsHeader}
      tracksTitle="Любимые песни"
      albumTitle="Альбомы"
      trackTransformer={trackTransformer}
      albumTransformer={albumTransformer}
      tracksQuery={GET_LIKED_MUSIC}
      albumsQuery={GET_LIKED_ALBUMS}
      tracksSelector={tracksSelector}
      albumsSelector={albumsSelector}
      {...props}
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

export default withNavigation(LikedMusicContainer)
