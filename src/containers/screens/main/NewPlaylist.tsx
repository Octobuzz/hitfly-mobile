import React from 'react'
import gql from 'graphql-tag'
import NonCollectionPlaylist from './NonCollectionPlaylist'
import { images } from 'src/constants'

// FIXME: тут чтото сделать с пагинацей:
// либо запросить все треки сразу
// либо добавить пагинацию в UI
export const GET_NEW_TRACKS = gql`
  query {
    playlist: tracks(limit: 50, page: 0) {
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

const NewPlaylist: React.FC = props => (
  <NonCollectionPlaylist
    query={GET_NEW_TRACKS}
    cover={images.NEW_PLAYLIST}
    {...props}
  />
)

export default NewPlaylist
