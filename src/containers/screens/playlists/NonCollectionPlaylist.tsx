import L from 'lodash'
import React from 'react'
import { DocumentNode } from 'graphql'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import {
  withTrackToggle,
  withDetailedTrackMenu,
  withChangingHeaderSettings,
  ToggleTrackProps,
  DetailedTrackMenuProps,
} from 'src/HOCs'
import PlaylistScreen from 'src/screens/Playlist'
import { useQueryWithPagination } from 'src/hooks'
import { Track } from 'src/apollo'
import { names } from 'src/constants'

interface Props
  extends NavigationStackScreenProps<{ trackToPlay?: Track; title: string }> {
  query: DocumentNode
  variables?: Record<string, any>
  playlistKey: string
  cover: any // FIXME: вытащить проп из PlaylistScreen
  itemTransformer?: (data: any) => any
  itemsSelector: (data: any) => any[]
  hasMorePagesSelector: (data: any) => boolean
}

interface HOCsProps extends Props, DetailedTrackMenuProps, ToggleTrackProps {}

const NonCollectionPlaylist: React.FC<HOCsProps> = ({
  query,
  cover,
  variables,
  playlistKey,
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
    variables,
    itemsSelector,
    hasMorePagesSelector,
    limit: names.PLAYLIST_LIMIT,
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

  const paginatedPlaylistKey = `${playlistKey}:${items.length}`

  return (
    <PlaylistScreen
      onEndReached={onEndReached}
      isLoading={networkStatus === 1}
      isRefreshing={networkStatus === 4}
      isFetchingMore={networkStatus === 3}
      onRefresh={refetch}
      cover={cover}
      tracks={tracks}
      playlistKey={paginatedPlaylistKey}
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
