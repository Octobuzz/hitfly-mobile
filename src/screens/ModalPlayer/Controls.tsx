import React, { useCallback } from 'react'
import Icon from 'react-native-vector-icons/Foundation'
import { ToggleTrackProps } from 'src/HOCs'
import styled from 'src/styled-components'

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`

const ControlWrapper = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.8,
}))`
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  width: 30px;
  align-items: center;
`

const ControlIcon = styled(Icon).attrs(({ theme }) => ({
  color: theme.colors.white,
}))``

interface Props extends Omit<ToggleTrackProps, 'activeTrack' | 'shuffle'> {}

const Controls: React.FC<Props> = ({
  isPlaying,
  prevTrack,
  nextTrack,
  toggleTrack,
  canPlayNext,
  canPlayPrev,
}) => {
  // приходит ивент в onPress, поэтому так сделано
  const handlePressPlay = useCallback(() => {
    toggleTrack()
  }, [toggleTrack])
  return (
    <Row>
      <ControlWrapper disabled={!canPlayPrev} onPress={prevTrack}>
        <ControlIcon size={40} name="previous" />
      </ControlWrapper>
      <ControlWrapper onPress={handlePressPlay}>
        <ControlIcon size={50} name={isPlaying ? 'pause' : 'play'} />
      </ControlWrapper>
      <ControlWrapper disabled={!canPlayNext} onPress={nextTrack}>
        <ControlIcon size={40} name="next" />
      </ControlWrapper>
    </Row>
  )
}

export default Controls
