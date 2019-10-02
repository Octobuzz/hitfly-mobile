import L from 'lodash'
import React from 'react'
import { graphql, DataProps } from '@apollo/react-hoc'
import TracksFeedback from './TracksFeedback'
import {
  withTrackToggle,
  ToggleTrackProps,
  DetailedTrackMenuProps,
} from 'src/containers/HOCs'
import { Loader } from 'src/components'
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
  if (loading) {
    return <Loader isAbsolute />
  }

  if (!tracks) {
    return null
  }

  return (
    <TracksFeedback
      isLoading={loading}
      onRefresh={refetch}
      tracks={tracks.items}
      {...rest}
    />
  )
}

// FIXME: потом заделать пагинацию нормально
// FIXME: сделать через фрагменты
const GET_MY_TRACKS_WITH_FEEDBACK = gql`
  query {
    tracks(limit: 1000, page: 1, commentPeriod: year, filters: { my: true }) {
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
              url
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
)(TracksFeedbackContainer)
