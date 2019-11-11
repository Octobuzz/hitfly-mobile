import L from 'lodash'
import React from 'react'
import { DocumentNode } from 'graphql'
import {
  withTrackToggle,
  withDetailedTrackMenu,
  withChangingHeaderSettings,
  ToggleTrackProps,
  DetailedTrackMenuProps,
} from 'src/HOCs'
import PlaylistScreen from 'src/screens/Playlist'
import { Loader } from 'src/components'
import { useQueryWithPagination } from 'src/Hooks'
import { Track } from 'src/apollo'

// FIXME: какая-то херня при передаче onEndReached - 2 раза делает запрос с page = 2
// надо поправить позже. пока "отклюена пагинация"
const LIMIT = 500

interface Props {
  query: DocumentNode
  cover: any // FIXME: вытащить проп из PlaylistScreen
  itemTransformer?: (data: any) => any
  itemsSelector: (data: any) => any[]
  hasMorePagesSelector: (data: any) => boolean
}

interface HOCsProps extends Props, DetailedTrackMenuProps, ToggleTrackProps {}

const NonCollectionPlaylist: React.FC<HOCsProps> = ({
  query,
  cover,
  itemsSelector,
  itemTransformer,
  hasMorePagesSelector,
  ...rest
}) => {
  const {
    items,
    refetch,
    onEndReached,
    networkStatus,
  } = useQueryWithPagination(query, {
    itemsSelector,
    hasMorePagesSelector,
    limit: LIMIT,
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  })

  let tracks: Track[] = items
  if (itemTransformer) {
    tracks = tracks.map(itemTransformer)
  }

  const favouritesCount = React.useMemo((): number => {
    if (!tracks.length) {
      return 0
    }
    const count = L.sumBy(tracks, 'favouritesCount')
    return count
  }, [tracks])

  if (networkStatus === 1) {
    return <Loader isAbsolute />
  }

  return (
    <PlaylistScreen
      onEndReached={onEndReached}
      isRefreshing={networkStatus === 4}
      isFetchingMore={networkStatus === 3}
      onRefresh={refetch}
      cover={cover}
      tracks={tracks}
      favouritesCount={favouritesCount}
      {...rest}
    />
  )
}

export default L.flowRight(
  withChangingHeaderSettings({ state: 'main', mode: 'light' }),
  withDetailedTrackMenu,
  withTrackToggle,
)(NonCollectionPlaylist) as React.FC<Props>
