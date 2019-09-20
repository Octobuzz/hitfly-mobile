import React from 'react'
import { ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/Foundation'
import styled from 'src/styled-components'

const ControlIcon = styled(Icon).attrs(({ theme }) => ({
  color: theme.colors.textWhite,
  size: 36,
}))`
  top: 2px;
  line-height: 36px;
  text-align: center;
`

const PauseIcon = styled(ControlIcon).attrs(() => ({
  name: 'pause',
}))``

const PlayIcon = styled(ControlIcon).attrs(() => ({
  name: 'play',
}))`
  left: 3px;
`

const Wrapper = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.8,
}))`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${({ theme }) => theme.colors.textMain};
  justify-content: center;
  align-items: center;
`

interface Props {
  onPress?: () => void
  style?: ViewStyle
  isPlaying?: boolean
}

const ControlButton: React.FC<Props> = ({ isPlaying, style, onPress }) => {
  return (
    <Wrapper onPress={onPress} style={style}>
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </Wrapper>
  )
}

export default ControlButton
