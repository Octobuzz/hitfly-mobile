import L from 'lodash'
import React, { useState, useCallback } from 'react'
import TracksFeedback, { FeedbackPeriod } from './TracksFeedback'
import {
  withTrackToggle,
  ToggleTrackProps,
  withDetailedTrackMenu,
  DetailedTrackMenuProps,
} from 'src/HOCs'
import { useQueryWithPagination } from 'src/hooks'
import { GET_MY_TRACKS_WITH_FEEDBACK, TracksWithFeedbackData } from 'src/apollo'
import { names } from 'src/constants'

const LIMIT = 30

const itemsSelector = (data: any) => L.get(data, 'tracks.items', [])
const hasMorePagesSelector = (data: any) =>
  L.get(data, 'tracks.hasMorePages', false)

interface Props extends ToggleTrackProps, DetailedTrackMenuProps {}

const TracksFeedbackContainer: React.FC<Props> = props => {
  const { data, refetch, networkStatus, onEndReached } = useQueryWithPagination<
    TracksWithFeedbackData
  >(GET_MY_TRACKS_WITH_FEEDBACK, {
    itemsSelector,
    hasMorePagesSelector,
    limit: LIMIT,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  const [period, setPeriod] = useState<FeedbackPeriod>('week')
  const tracks = L.get(data, 'tracks.items', [])

  const changePeriod = useCallback((nextPeriod: FeedbackPeriod) => {
    setPeriod(nextPeriod)
    refetch({ period: nextPeriod })
  }, [])

  const onRefresh = useCallback(() => {
    refetch({ period })
  }, [period])

  const paginatedPlaylistKey = `${names.PLAYLIST_KEYS.TRACKS_FEEDBACK}:${tracks.length}`

  return (
    <TracksFeedback
      selectedPeriod={period}
      onPressPeriod={changePeriod}
      isLoading={networkStatus === 1}
      isRefreshing={networkStatus === 4}
      isFetchingMore={networkStatus === 3}
      onEndReached={onEndReached}
      onRefresh={onRefresh}
      tracks={tracks}
      playlistKey={paginatedPlaylistKey}
      {...props}
    />
  )
}

export default L.flowRight(
  withTrackToggle,
  withDetailedTrackMenu,
)(TracksFeedbackContainer) as React.FC<any>
