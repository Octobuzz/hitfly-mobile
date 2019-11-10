import LFP from 'lodash/fp'
import React from 'react'
import NonCollectionPlaylist from './NonCollectionPlaylist'
import { images } from 'src/constants'
import { GET_LIKED_MUSIC } from 'src/apollo'

const hasMorePagesSelector = LFP.get('tracks.hasMorePagesSelector')
const tracksSelector = LFP.getOr([], 'tracks.items')
const trackTransformer = LFP.get('track')

const NewPlaylist: React.FC = props => (
  <NonCollectionPlaylist
    hasMorePagesSelector={hasMorePagesSelector}
    itemsSelector={tracksSelector}
    itemTransformer={trackTransformer}
    query={GET_LIKED_MUSIC}
    cover={images.DEFAULT_ALBUM}
    {...props}
  />
)

export default NewPlaylist
