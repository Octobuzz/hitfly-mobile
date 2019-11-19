import Slider from './Slider'
import styled from 'src/styled-components'

const StyledSlider = styled(Slider).attrs(({ theme }) => ({
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
  trackClickable: true,
}))`
  height: 8px;
`

export default StyledSlider
