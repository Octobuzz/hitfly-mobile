import LFP from 'lodash/fp'
import React from 'react'
import NonCollectionPlaylist from './NonCollectionPlaylist'
import { images } from 'src/constants'
import { GET_MY_MUSIC } from 'src/apollo'

const hasMorePagesSelector = LFP.get('tracks.hasMorePagesSelector')
const tracksSelector = LFP.getOr([], 'tracks.items')

const NewPlaylist: React.FC = props => (
  <NonCollectionPlaylist
    hasMorePagesSelector={hasMorePagesSelector}
    itemsSelector={tracksSelector}
    query={GET_MY_MUSIC}
    cover={images.DEFAULT_ALBUM}
    {...props}
  />
)

export default NewPlaylist
