import LFP from 'lodash/fp'
import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import gql from 'graphql-tag'
import NonCollectionPlaylist from './NonCollectionPlaylist'
import { images, names } from 'src/constants'

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

// тут без пагинации, всегда 50 треков
const hasMorePagesSelector = LFP.F
const itemsSelector = LFP.getOr([], 'playlist.items')

const Top50Playlist: React.FC<NavigationStackScreenProps> = props => (
  <NonCollectionPlaylist
    hasMorePagesSelector={hasMorePagesSelector}
    itemsSelector={itemsSelector}
    query={GET_TOP50_TRACKS}
    cover={images.TOP50_PLAYLIST}
    playlistKey={names.PLAYLIST_KEYS.TOP_50}
    {...props}
  />
)

export default Top50Playlist
