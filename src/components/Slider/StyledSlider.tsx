import React from 'react'
import Slider from './Slider'
import LinearGradient from 'react-native-linear-gradient'
import styled from 'src/styled-components'

const Gradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [theme.colors.brandBlue, theme.colors.brandPink],
  start: { x: 0, y: 0.5 },
  end: { x: 1, y: 0.5 },
}))`
  width: 100%;
  height: 100%;
`

const customMinimumTrack = <Gradient />

const StyledSlider = styled(Slider).attrs(({ theme }) => ({
  customMinimumTrack,
  minimumTrackTintColor: theme.colors.brandPink,
  maximumTrackTintColor: theme.colors.gray,
  trackStyle: {
    height: 8,
    borderRadius: 0,
  },
  thumbStyle: {
    height: 8,
    width: 3,
    borderRadius: 0,
    backgroundColor: theme.colors.black,
  },
  trackPressable: true,
}))`
  height: 8px;
`

export default StyledSlider
