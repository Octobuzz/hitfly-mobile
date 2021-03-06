import LFP from 'lodash/fp'
import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import NonCollectionPlaylist from './NonCollectionPlaylist'
import { images, names } from 'src/constants'
import { GET_MY_MUSIC } from 'src/apollo'

const hasMorePagesSelector = LFP.get('tracks.hasMorePages')
const itemsSelector = LFP.getOr([], 'tracks.items')

const NewPlaylist: React.FC<NavigationStackScreenProps> = props => (
  <NonCollectionPlaylist
    hasMorePagesSelector={hasMorePagesSelector}
    itemsSelector={itemsSelector}
    query={GET_MY_MUSIC}
    cover={images.MY_MUSIC}
    playlistKey={names.PLAYLIST_KEYS.MY_MUSIC}
    {...props}
  />
)

export default NewPlaylist
