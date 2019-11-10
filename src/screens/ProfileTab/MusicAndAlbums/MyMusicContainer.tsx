import LFP from 'lodash/fp'
import React, { useCallback } from 'react'
import { withNavigation, NavigationInjectedProps } from 'react-navigation'
import MusicAndAlbumsContainer from './MusicAndAlbumsContainer'
import { GET_MY_ALBUMS } from 'src/apollo'
import gql from 'graphql-tag'
import { ROUTES } from 'src/navigation'

interface Props extends NavigationInjectedProps {}

const albumsSelector = LFP.getOr([], 'albums.items')
const tracksSelector = LFP.getOr([], 'tracks.items')

const MyMusicContainer: React.FC<Props> = props => {
  const onPressAlbumsHeader = useCallback(() => {
    props.navigation.navigate(ROUTES.MAIN.MY_ALBUMS_DETAILED)
  }, [])

  return (
    <MusicAndAlbumsContainer
      onPressAlbumsHeader={onPressAlbumsHeader}
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

export default withNavigation(MyMusicContainer)
