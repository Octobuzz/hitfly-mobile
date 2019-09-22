import L from 'lodash'
import React from 'react'
import { DocumentNode } from 'graphql'
import { Query } from '@apollo/react-components'
import { PlaylistScreen } from 'src/screens'
import { Pagination, Playlist, Track } from 'src/apollo'
import { Loader } from 'src/components'

interface Data {
  playlist?: Pagination<Track>
}

interface Props {
  query: DocumentNode
  cover: any // FIXME: вытащить проп из PlaylistScreen
}

class NonCollectionPlaylist extends React.Component<Props> {
  private getFavouritesCount = (playlist: Playlist): number => {
    const count = L.sumBy<Track>(playlist, 'favouritesCount')
    return count
  }

  render() {
    const { query, cover } = this.props
    return (
      <Query<Data> query={query}>
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
              cover={cover}
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

export default NonCollectionPlaylist
