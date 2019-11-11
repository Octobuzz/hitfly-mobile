import LFP from 'lodash/fp'
import React, { useCallback } from 'react'
import { withNavigation, NavigationInjectedProps } from 'react-navigation'
import MusicAndAlbumsContainer from './MusicAndAlbumsContainer'
import { GET_LIKED_ALBUMS, GET_LIKED_MUSIC } from 'src/apollo'
import { ROUTES } from 'src/navigation'

interface Props extends NavigationInjectedProps {}

const albumsSelector = LFP.getOr([], 'albums.items')
const tracksSelector = LFP.getOr([], 'tracks.items')
const albumTransformer = LFP.get('album')
const trackTransformer = LFP.get('track')

const LikedMusicContainer: React.FC<Props> = props => {
  const onPressTracksHeader = useCallback(() => {
    props.navigation.navigate(ROUTES.MAIN.LIKED_MUSIC_PLAYLIST)
  }, [])

  const onPressAlbumsHeader = useCallback(() => {
    props.navigation.navigate(ROUTES.MAIN.LIKED_ALBUMS_DETAILED)
  }, [])

  return (
    <MusicAndAlbumsContainer
      onPressTracksHeader={onPressTracksHeader}
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

export default withNavigation(LikedMusicContainer) as React.FC<any>
