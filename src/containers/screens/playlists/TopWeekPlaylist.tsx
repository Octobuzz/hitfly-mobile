import LFP from 'lodash/fp'
import React from 'react'
import NonCollectionPlaylist from './NonCollectionPlaylist'
import { GET_TOP_WEEK_TRACKS } from 'src/apollo'
import { images, names } from 'src/constants'

const hasMorePagesSelector = LFP.get('playlist.hasMorePages')
const itemsSelector = LFP.getOr([], 'playlist.items')

const TopWeekPlaylist: React.FC = props => (
  <NonCollectionPlaylist
    hasMorePagesSelector={hasMorePagesSelector}
    itemsSelector={itemsSelector}
    query={GET_TOP_WEEK_TRACKS}
    cover={images.TOP_WEEK_PLAYLIST}
    playlistKey={names.PLAYLIST_KEYS.TOP_WEEK}
    {...props}
  />
)

export default TopWeekPlaylist
