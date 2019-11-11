import LFP from 'lodash/fp'
import React from 'react'
import NonCollectionPlaylist from './NonCollectionPlaylist'
import { GET_LISTENED_NOW_TRACKS } from 'src/apollo'
import { images } from 'src/constants'

const hasMorePagesSelector = LFP.get('playlist.hasMorePages')
const itemsSelector = LFP.getOr([], 'playlist.items')

const ListenedNowPlaylist: React.FC = props => (
  <NonCollectionPlaylist
    hasMorePagesSelector={hasMorePagesSelector}
    itemsSelector={itemsSelector}
    query={GET_LISTENED_NOW_TRACKS}
    cover={images.LISTENED_NOW_PLAYLIST}
    {...props}
  />
)

export default ListenedNowPlaylist
