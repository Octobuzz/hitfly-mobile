import React from 'react'
import styled from 'src/styled-components'
import LottieView from 'lottie-react-native'
import animation from './playaudio.json'

const Wrapper = styled.View<Props>`
  ${({ isFilled }) => isFilled && 'flex: 1;'}
  ${({ isAbsolute }) =>
    isAbsolute &&
    `
    position: absolute;
    left: 0;
    top: 0;
    right:0;
    bottom:0;
  `}
  align-items: center;
  justify-content: center;
`

const StyledLottie = styled(LottieView).attrs(() => ({
  source: animation,
  autoPlay: true,
  loop: true,
}))<Sized>`
  ${({ size }) => size && `height: ${size}px;`}
`

interface Sized {
  size?: number
}

interface Props extends Sized {
  isAbsolute?: boolean
  isFilled?: boolean
}

const Loader: React.FC<Props> = ({ size, ...props }) => (
  <Wrapper {...props}>
    <StyledLottie size={size} />
  </Wrapper>
)

export default Loader
