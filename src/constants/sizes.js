import { Dimensions, PixelRatio } from 'react-native'

export const WINDOW_WIDTH = Dimensions.get('window').width
export const WINDOW_HEIGHT = Dimensions.get('window').height
export const PIXEL_RATIO = PixelRatio.get()
// export const PIXEL_RATIO = 3

export const BUTTON_HEIGHT = PIXEL_RATIO < 3 ? 32 + (24 / 3) * PIXEL_RATIO : 56
export const BUTTON_MAX_WIDTH = WINDOW_WIDTH * 0.75

export const INPUT_HEIGHT = 48

export const CORRECT_PIXEL_RATIO_SIZE = (size = 1) =>
  PIXEL_RATIO < 3 ? size / 2 + (size / 2 / 3) * PIXEL_RATIO : size