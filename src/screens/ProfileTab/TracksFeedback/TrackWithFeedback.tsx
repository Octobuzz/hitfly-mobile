import React from 'react'
import { View, PlaylistTrack, PlaylistTrackProps } from 'src/components'
import FeedbackCarousel from './FeedbackCarousel'
import styled from 'src/styled-components'

const Wrapper = styled.View`
  border-radius: 4px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.inputBorder};
`

const Body = styled(View)`
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.inputBorder};
`

interface Props extends PlaylistTrackProps {}

const TrackWithFeedback: React.FC<Props> = props => (
  <Wrapper>
    <PlaylistTrack hideIndex {...props} />
    <Body>
      <FeedbackCarousel comments={props.track.comments} />
    </Body>
  </Wrapper>
)

export default TrackWithFeedback
