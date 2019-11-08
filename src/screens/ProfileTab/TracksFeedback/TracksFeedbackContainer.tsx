import L from 'lodash'
import React, { useState, useCallback } from 'react'
import TracksFeedback, { FeedbackPeriod } from './TracksFeedback'
import {
  withTrackToggle,
  ToggleTrackProps,
  withDetailedTrackMenu,
  DetailedTrackMenuProps,
} from 'src/HOCs'
import { useQueryWithPagination } from 'src/Hooks'
import { Pagination, Track } from 'src/apollo'
import gql from 'graphql-tag'

const LIMIT = 20
const GET_MY_TRACKS_WITH_FEEDBACK = gql`
  query feedbackTracks(
    $limit: Int = 20
    $page: Int = 1
    $period: CommentPeriodEnum = week
  ) {
    tracks(
      limit: $limit
      page: $page
      commentPeriod: $period
      filters: { my: true }
    ) {
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
        comments(commentPeriod: year) {
          id
          comment
          createdAt
          createdBy: user {
            id
            userName: username
            avatar(sizes: [size_235x235]) {
              imageUrl: url
            }
          }
        }
      }
      hasMorePages: has_more_pages
    }
  }
`

interface TracksData {
  tracks: Pagination<Track>
}

const itemsSelector = (data?: TracksData) => L.get(data, 'tracks.items', [])
const hasMorePagesSelector = (data?: TracksData) =>
  L.get(data, 'tracks.hasMorePages', false)

interface Props extends ToggleTrackProps, DetailedTrackMenuProps {}

const TracksFeedbackContainer: React.FC<Props> = ({ ...rest }) => {
  const { data, refetch, networkStatus, onEndReached } = useQueryWithPagination<
    TracksData
  >(GET_MY_TRACKS_WITH_FEEDBACK, {
    itemsSelector,
    hasMorePagesSelector,
    limit: LIMIT,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  const [period, setPeriod] = useState<FeedbackPeriod>('week')
  const tracksItems = L.get(data, 'tracks.items', [])

  const changePeriod = useCallback((nextPeriod: FeedbackPeriod) => {
    setPeriod(nextPeriod)
    refetch({ period: nextPeriod })
  }, [])

  const onRefresh = useCallback(() => {
    refetch({ period })
  }, [period])

  return (
    <TracksFeedback
      selectedPeriod={period}
      onPressPeriod={changePeriod}
      isLoading={networkStatus === 1}
      isRefreshing={networkStatus === 4}
      isFetchingMore={networkStatus === 3}
      onEndReached={onEndReached}
      onRefresh={onRefresh}
      tracks={tracksItems}
      {...rest}
    />
  )
}

export default L.flowRight(
  withTrackToggle,
  withDetailedTrackMenu,
)(TracksFeedbackContainer)
