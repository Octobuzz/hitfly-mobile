import React from 'react'
import styled from 'src/styled-components'
import LottieView from 'lottie-react-native'
import animation from './playaudio.json'

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Loader = () => (
  <Wrapper>
    <LottieView source={animation} autoPlay loop />
  </Wrapper>
)

export default Loader
