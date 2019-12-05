import LFP from 'lodash/fp'
import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import NonCollectionPlaylist from './NonCollectionPlaylist'
import { images, names } from 'src/constants'
import { GET_NEW_TRACKS, Track } from 'src/apollo'

const hasMorePagesSelector = LFP.get('playlist.hasMorePages')
const itemsSelector = LFP.getOr([], 'playlist.items')

interface Props
  extends NavigationStackScreenProps<{ trackToPlay?: Track; title: string }> {}

const NewPlaylist: React.FC<Props> = props => (
  <NonCollectionPlaylist
    hasMorePagesSelector={hasMorePagesSelector}
    itemsSelector={itemsSelector}
    query={GET_NEW_TRACKS}
    cover={images.NEW_PLAYLIST}
    playlistKey={names.PLAYLIST_KEYS.NEW_TRACKS}
    {...props}
  />
)

export default NewPlaylist
