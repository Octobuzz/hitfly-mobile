import L from 'lodash'
import React, { useEffect, useCallback } from 'react'
import { withNavigation } from 'react-navigation'
import { TracksSection } from '../components'
import { routes, names } from 'src/constants'
import { useQueryWithPagination } from 'src/Hooks'
import { GET_TOP_WEEK_TRACKS, Track } from 'src/apollo'

const itemsSelector = (data: any) => L.get(data, 'playlist.items', [])
const hasMorePagesSelector = (data: any) =>
  L.get(data, 'playlist.hasMorePages', false)

const TopWeekContainer: React.FC<any> = ({ navigation, getRefetcher }) => {
  const {
    items,
    refetch,
    networkStatus,
    onEndReached,
  } = useQueryWithPagination(GET_TOP_WEEK_TRACKS, {
    itemsSelector,
    hasMorePagesSelector,
    limit: names.PLAYLIST_LIMIT,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (getRefetcher) {
      getRefetcher(refetch)
    }
  }, [getRefetcher])

  const onPressHeader = useCallback(() => {
    navigation.navigate(routes.MAIN.TOP_WEEK_PLAYLIST)
  }, [])

  const onPressTrack = useCallback((track: Track) => {
    navigation.navigate(routes.MAIN.TOP_WEEK_PLAYLIST, { trackToPlay: track })
  }, [])

  const isLoading = networkStatus === 4 || networkStatus === 1

  return (
    <TracksSection
      onPressTrack={onPressTrack}
      onPressHeader={onPressHeader}
      playlist={items}
      isLoading={isLoading}
      isFetchingMore={networkStatus === 3}
      onEndReached={onEndReached}
      title="Открытие недели"
      subtitle="Треки, которые неожиданно поднялись в чарте"
    />
  )
}

export default withNavigation(TopWeekContainer)
