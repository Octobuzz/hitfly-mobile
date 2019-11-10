import LFP from 'lodash/fp'
import React from 'react'
import gql from 'graphql-tag'
import NonCollectionPlaylist from './NonCollectionPlaylist'
import { images } from 'src/constants'

const GET_TOP50_TRACKS = gql`
  query {
    playlist: GetTopFifty(limit: 50, page: 0) {
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

const Top50Playlist: React.FC = props => (
  <NonCollectionPlaylist
    hasMorePagesSelector={hasMorePagesSelector}
    itemsSelector={itemsSelector}
    query={GET_TOP50_TRACKS}
    cover={images.TOP50_PLAYLIST}
    {...props}
  />
)

export default Top50Playlist
