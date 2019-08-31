import React from 'react'
import styled from 'src/styled-components'
import LottieView from 'lottie-react-native'
import animation from './playaudio.json'

const Wrapper = styled.View<Props>`
  ${({ isFilled }) => isFilled && 'flex: 1;'}
  align-items: center;
  justify-content: center;
`

interface Props {
  isAbsolute?: boolean
  isFilled?: boolean
}

const Loader: React.FC<Props> = props => (
  <Wrapper {...props}>
    <LottieView source={animation} autoPlay loop />
  </Wrapper>
)

export default Loader
