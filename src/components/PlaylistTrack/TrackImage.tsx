import React from 'react'
import { ViewStyle } from 'react-native'
import { Playable } from './interfaces'
import { Image } from 'src/components/Image'
import Icon from 'react-native-vector-icons/Foundation'
import styled from 'src/styled-components'

const PauseIcon = styled(Icon).attrs(({ theme }) => ({
  color: theme.colors.textWhite,
  size: 16,
  name: 'pause',
}))``

const ControlOverlayWrapper = styled.View<Playable>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.transparent70};
`

const ControlOverlay: React.FC = () => {
  return (
    <ControlOverlayWrapper>
      <PauseIcon />
    </ControlOverlayWrapper>
  )
}

const Wrapper = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  overflow: hidden;
`

const StyledImage = styled(Image)`
  flex: 1;
`

interface Props extends Playable {
  imageUrl: string
  style?: ViewStyle
}

const TrackImage: React.FC<Props> = ({ isPlaying, imageUrl, style }) => {
  return (
    <Wrapper style={style}>
      <StyledImage source={{ uri: imageUrl }} />
      {isPlaying && <ControlOverlay />}
    </Wrapper>
  )
}

export default TrackImage
