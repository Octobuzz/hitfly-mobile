import LFP from 'lodash/fp'
import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import NonCollectionPlaylist from './NonCollectionPlaylist'
import { images, names } from 'src/constants'
import { GET_LIKED_MUSIC } from 'src/apollo'

const hasMorePagesSelector = LFP.get('tracks.hasMorePages')
const itemsSelector = LFP.getOr([], 'tracks.items')
const itemTransformer = LFP.get('track')

const NewPlaylist: React.FC<NavigationStackScreenProps> = props => (
  <NonCollectionPlaylist
    hasMorePagesSelector={hasMorePagesSelector}
    itemsSelector={itemsSelector}
    itemTransformer={itemTransformer}
    query={GET_LIKED_MUSIC}
    cover={images.LIKED_MUSIC}
    playlistKey={names.PLAYLIST_KEYS.LIKED_MUSIC}
    {...props}
  />
)

export default NewPlaylist
