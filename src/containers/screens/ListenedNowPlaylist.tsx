import L from 'lodash'
import React from 'react'
import gql from 'graphql-tag'
import { Query } from '@apollo/react-components'
import { PlaylistScreen } from 'src/screens'
import { Pagination, Playlist, Track } from 'src/apollo'
import { Loader } from 'src/components'
import { images } from 'src/constants'

// FIXME: тут чтото сделать с пагинацей:
// либо запросить все треки сразу
// либо добавить пагинацию в UI
const GET_LISTENED_NOW_TRACKS = gql`
  query {
    playlist: GetListenedNow(limit: 50, page: 0) {
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

interface Data {
  playlist?: Pagination<Track>
}

class ListenedNowPlaylist extends React.Component {
  private getFavouritesCount = (playlist: Playlist): number => {
    const count = L.sumBy<Track>(playlist, 'favouritesCount')
    return count
  }

  render() {
    return (
      <Query<Data> query={GET_LISTENED_NOW_TRACKS}>
        {({ data, loading }) => {
          if (loading) {
            return <Loader isAbsolute />
          }

          if (!data || !data.playlist) {
            return null
          }
          const { items } = data.playlist
          const favouritesCount = this.getFavouritesCount(items)
          return (
            <PlaylistScreen
              cover={images.LISTENED_NOW_PLAYLIST}
              tracks={items}
              favouritesCount={favouritesCount}
              {...this.props}
            />
          )
        }}
      </Query>
    )
  }
}

export default ListenedNowPlaylist
