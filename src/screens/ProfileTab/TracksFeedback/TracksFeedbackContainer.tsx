import L from 'lodash'
import React, { useState, useCallback } from 'react'
import { graphql, DataProps } from '@apollo/react-hoc'
import TracksFeedback, { FeedbackPeriod } from './TracksFeedback'
import {
  withTrackToggle,
  ToggleTrackProps,
  withDetailedTrackMenu,
  DetailedTrackMenuProps,
} from 'src/containers/HOCs'
import { Pagination, Track } from 'src/apollo'
import gql from 'graphql-tag'

interface Props
  extends ToggleTrackProps,
    DetailedTrackMenuProps,
    DataProps<{ tracks: Pagination<Track> }> {}

const TracksFeedbackContainer: React.FC<Props> = ({
  data: { tracks, loading, refetch },
  ...rest
}) => {
  const [period, setPeriod] = useState<FeedbackPeriod>('week')
  const tracksItems = L.get(tracks, 'items', [])

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
      isLoading={loading}
      onRefresh={onRefresh}
      tracks={tracksItems}
      {...rest}
    />
  )
}

// FIXME: потом заделать пагинацию нормально
// FIXME: сделать через фрагменты
const GET_MY_TRACKS_WITH_FEEDBACK = gql`
  query feedbackTracks(
    $limit: Int = 50
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
    }
  }
`

export default L.flowRight(
  graphql(GET_MY_TRACKS_WITH_FEEDBACK),
  withTrackToggle,
  withDetailedTrackMenu,
)(TracksFeedbackContainer)
