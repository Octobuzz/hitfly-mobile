import L from 'lodash'
import React, { useEffect, useCallback } from 'react'
import { withNavigation } from 'react-navigation'
import { TracksSection } from '../components'
import { GET_TOP_WEEK_TRACKS, PlaylistData } from './graphql'
import { ROUTES } from 'src/navigation'
import { useQueryWithPagination } from 'src/Hooks'

const LIMIT = 20
const itemsSelector = (data?: PlaylistData) => L.get(data, 'playlist.items', [])
const hasMorePagesSelector = (data?: PlaylistData) =>
  L.get(data, 'playlist.hasMorePages', false)

const TopWeekContainer: React.FC<any> = ({ navigation, getRefetcher }) => {
  const {
    items,
    refetch,
    networkStatus,
    onEndReached,
  } = useQueryWithPagination<PlaylistData>(GET_TOP_WEEK_TRACKS, {
    itemsSelector,
    hasMorePagesSelector,
    limit: LIMIT,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (getRefetcher) {
      getRefetcher(refetch)
    }
  }, [getRefetcher])

  const onPressHeader = useCallback(() => {
    navigation.navigate(ROUTES.MAIN.TOP_WEEK_PLAYLIST)
  }, [])
  // TODO: когда будет плеер, сделать HOC и прокинуть нужную функцию сюда
  const onPressTrack = useCallback(() => {
    navigation.navigate(ROUTES.MAIN.TOP_WEEK_PLAYLIST)
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
