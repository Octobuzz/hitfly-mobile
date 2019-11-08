import L from 'lodash'
import React from 'react'
import { DocumentNode } from 'graphql'
import { useQuery } from '@apollo/react-hooks'
import {
  withTrackToggle,
  withDetailedTrackMenu,
  withChangingHeaderSettings,
  ToggleTrackProps,
  DetailedTrackMenuProps,
} from 'src/HOCs'
import PlaylistScreen from 'src/screens/Playlist'
import { Pagination, Track } from 'src/apollo'
import { Loader } from 'src/components'

interface Data {
  playlist?: Pagination<Track>
}

interface Props extends DetailedTrackMenuProps, ToggleTrackProps {
  query: DocumentNode
  cover: any // FIXME: вытащить проп из PlaylistScreen
}

const NonCollectionPlaylist: React.FC<Props> = ({ query, cover, ...rest }) => {
  const { data, loading } = useQuery<Data>(query)

  const favouritesCount = React.useMemo((): number => {
    if (!data || !data.playlist) {
      return 0
    }
    const count = L.sumBy<Track>(data.playlist.items, 'favouritesCount')
    return count
  }, [data])

  if (loading) {
    return <Loader isAbsolute />
  }

  if (!data || !data.playlist) {
    return null
  }
  const { items } = data.playlist
  return (
    <PlaylistScreen
      cover={cover}
      tracks={items}
      favouritesCount={favouritesCount}
      {...rest}
    />
  )
}

export default L.flowRight(
  withChangingHeaderSettings({ state: 'main', mode: 'light' }),
  withDetailedTrackMenu,
  withTrackToggle,
)(NonCollectionPlaylist)
