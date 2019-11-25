import React from 'react'
import { Track } from 'src/apollo'
import { StyledSlider } from './Slider'
import { BottomPlayerTrack } from './PlaylistTrack'
import styled from 'src/styled-components'

const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
`

interface Props {
  track?: Track
  progress?: number
  duration?: number
  isPlaying: boolean
  onPress: () => void
  onPressControl: () => void
  onSlideEnd: (progress: number) => void
}

const BottomPlayer: React.FC<Props> = ({
  track,
  onSlideEnd,
  progress = 0,
  duration = 1,
  ...rest
}) => {
  if (!track) {
    return null
  }
  return (
    <Wrapper>
      <StyledSlider
        onSlidingComplete={onSlideEnd}
        maximumValue={duration}
        value={progress}
        step={1}
      />
      <BottomPlayerTrack {...rest} track={track} />
    </Wrapper>
  )
}

export default BottomPlayer
