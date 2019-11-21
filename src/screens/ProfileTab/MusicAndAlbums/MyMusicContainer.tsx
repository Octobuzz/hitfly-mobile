import LFP from 'lodash/fp'
import React, { useCallback } from 'react'
import { withNavigation, NavigationInjectedProps } from 'react-navigation'
import MusicAndAlbumsContainer from './MusicAndAlbumsContainer'
import { GET_MY_ALBUMS, GET_MY_MUSIC } from 'src/apollo'
import { routes, names } from 'src/constants'

interface Props extends NavigationInjectedProps {}

const albumsSelector = LFP.getOr([], 'albums.items')
const tracksSelector = LFP.getOr([], 'tracks.items')

const MyMusicContainer: React.FC<Props> = props => {
  const onPressTracksHeader = useCallback(() => {
    props.navigation.navigate(routes.MAIN.MY_MUSIC_PLAYLIST)
  }, [])
  const onPressAlbumsHeader = useCallback(() => {
    props.navigation.navigate(routes.MAIN.MY_ALBUMS_DETAILED)
  }, [])

  return (
    <MusicAndAlbumsContainer
      onPressTracksHeader={onPressTracksHeader}
      onPressAlbumsHeader={onPressAlbumsHeader}
      tracksQuery={GET_MY_MUSIC}
      albumsQuery={GET_MY_ALBUMS}
      tracksSelector={tracksSelector}
      albumsSelector={albumsSelector}
      tracksTitle="Песни"
      albumTitle="Альбомы"
      playlistKey={names.PLAYLIST_KEYS.MY_MUSIC}
      {...props}
    />
  )
}

export default withNavigation(MyMusicContainer) as React.FC<any>
