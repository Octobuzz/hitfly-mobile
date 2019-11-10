import LFP from 'lodash/fp'
import React from 'react'
import gql from 'graphql-tag'
import NonCollectionPlaylist from './NonCollectionPlaylist'
import { images } from 'src/constants'

// FIXME: тут чтото сделать с пагинацей:
// либо запросить все треки сразу
// либо добавить пагинацию в UI
export const GET_TOP_WEEK_TRACKS = gql`
  query {
    playlist: TopWeeklyQuery(limit: 50, page: 0) {
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
        favouritesCount
      }
    }
  }
`

const hasMorePagesSelector = LFP.get('playlist.hasMorePagesSelector')
const itemsSelector = LFP.getOr([], 'playlist.items')

const TopWeekPlaylist: React.FC = props => (
  <NonCollectionPlaylist
    hasMorePagesSelector={hasMorePagesSelector}
    itemsSelector={itemsSelector}
    query={GET_TOP_WEEK_TRACKS}
    cover={images.TOP_WEEK_PLAYLIST}
    {...props}
  />
)

export default TopWeekPlaylist
