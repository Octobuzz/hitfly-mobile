// @ts-ignore
import RNSlider from 'react-native-slider'
import styled from 'src/styled-components'

const Slider = styled(RNSlider).attrs(({ theme }) => ({
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
}))`
  height: 8px;
`

export default Slider
